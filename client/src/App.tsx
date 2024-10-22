/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import TweetsList from "./Components/TweetsList";

export interface Tweet {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnRes {
  total: number;
  pagination: {
    hasMore: boolean;
    skip: string;
    limit: number;
  };
  tweets: Tweet[];
}

const App = () => {
  const queryClient = useQueryClient();
  const [msg, setMsg] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [cSkip, setCSkip] = useState(0);
  const [cLimit, setCLimit] = useState(10);

  // Query all messages

  const { isLoading, data } = useQuery<ReturnRes>({
    queryKey: ["tweet", cSkip, cLimit],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/all?skip=${cSkip}&limit=${cLimit}`
      );
      const result: ReturnRes = await res.json();
      setHasMore(result.pagination.hasMore);
      return result;
    },
  });
  const tweets = data?.tweets || [];

  const handleNext = () => {
    setCSkip((prev) => prev + cLimit);
  };

  const handlePrev = () => {
    setCSkip((prev) => Math.max(prev - cLimit, 0));
  };

  // Send Tweet Mutation
  const sendMutate = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("http://localhost:5000/api/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result?.message || "Failed to Send Message");
      }

      return await res.json(); // Return the result for onSuccess
    },
    onSuccess: (result) => {
      toast.success(result?.message || "Message Sent");
      setMsg(""); // Clear the input after successful submission
      queryClient.invalidateQueries({
        queryKey: ["tweet"],
      });
    },
    onError: (error) => {
      toast.error((error as string) || "Failed to Send Message");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    sendMutate.mutate(msg); // Call mutate with the message content
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-gray-200 font-normal">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center rounded py-20 w-full max-w-xl mx-auto p-2"
      >
        <div className="space-y-3 w-full">
          <label className="text-sm font-bold" htmlFor="title">
            Send Message
          </label>
          <input
            type="text"
            placeholder="Type Here"
            value={msg}
            className="text-sm rounded shadow text-black px-4 py-2 w-full"
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-sm shadow bg-pink-700 hover:bg-pink-600 rounded-lg px-4 py-2 font-bold"
          >
            Send
          </button>
        </div>
      </form>
      <div className="flex items-center justify-end max-w-xl mx-auto py-10">
        <button
          onClick={handlePrev}
          disabled={cSkip === 0}
          type="button"
          className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={!hasMore}
          type="button"
          className="px-4 py-2 rounded bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <ul className="grid gap-2 w-full max-w-xl mx-auto">
        {isLoading && (
          <div className="flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
        {tweets?.map((tweet: Tweet) => (
          <TweetsList key={tweet.id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
};

export default App;
