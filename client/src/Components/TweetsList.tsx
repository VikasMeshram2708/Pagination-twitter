import { Tweet } from "../App";

interface TweetsListProps {
  tweet: Tweet;
}

export default function TweetsList({ tweet }: TweetsListProps) {
  return (
    <section>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <article>
          <h2 className="text-lg font-semibold text-white">
            Msg : {tweet.content}
          </h2>
          <p className="text-gray-300">By : {tweet.id}</p>
          <span className="text-sm text-gray-500">
            {new Date(tweet.createdAt).toLocaleString()}
          </span>
        </article>
      </div>
    </section>
  );
}
