import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4 items-center bg-white shadow-md">
      <Link to={"/blogs"}>
        <div className="text-lg font-bold cursor-pointer">Medium</div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mx-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New Blog +
          </button>
        </Link>
        <Avatar name={"Jogender"} size={"10"}></Avatar>
      </div>
    </div>
  );
};

export default Appbar;
