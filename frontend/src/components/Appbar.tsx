import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useAuth } from "../hooks";
import Dropdown from "./Dropdown";

const Appbar = () => {
  const { user } = useAuth();
  return (
    <div className="border-b flex justify-between px-10 py-4 bg-white shadow-md items-center">
      <Link to={"/blogs"}>
        <div className="text-lg font-bold cursor-pointer">Medium</div>
      </Link>
      <div className="flex items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mx-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New Blog +
          </button>
        </Link>
        <div className="cursor-pointer" title={user.name}>
          <Dropdown user={user}>
            <Avatar name={user.name} size={"big"}></Avatar>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
