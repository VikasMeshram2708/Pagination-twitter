import { useState } from "react";
import toast from "react-hot-toast";
// import { useDebounce } from "../lib/useDebounce";

export default function Navbar() {
  const [sQuery, setSQuery] = useState("");
//   const debounceValue = useDebounce(sQuery, 500);

//   useEffect(() => {
//     const filterTweets = () => {
//         try {
//             const res = await 
            
//         } catch (error) {
//             console.log(`Something went wrong. Failed to filter tweets :${error}`)
            
//         }
//     }
//   },[sQuery])

  return (
    <header className="w-full bg-slate-700 text-white p-2">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-3xl">Twitter</h1>
        <div className="flex gap-2">
          <input
            value={sQuery}
            onChange={(e) => setSQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-full border text-black text-sm font-bold"
          />
          <button
            onClick={() => toast.error("Coming Soon!")}
            className="px-4 py-2 rounded-md bg-pink-700 hover:bg-pink-600"
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
