import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";

export const Blog = () => {
  const { Id } = useParams();
  const { loading, blog } = useBlog({
    id: Id || "",
  });

  return (
    <div>
      <div className="sticky top-0 z-40">
        <Appbar></Appbar>
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className="grid grid-cols-3 my-14 mx-20 gap-5">
          <div className="col-span-2 gap-4 flex flex-col">
            <div className="text-5xl font-bold">{blog.title}</div>
            <div className="text-slate-500">
              Posted on {new Date().toDateString()}
            </div>
            <div className="text-lg text-slate-700">{blog.content}</div>
          </div>
          <div className="">
            <div className="font-medium text-gray-800">Author</div>
            <div className="flex gap-4 mt-4 items-center">
              <div>
                <Avatar name={" "} size={"6"}></Avatar>
              </div>
              <div>
                <div className="text-2xl font-bold">{blog.author.name}</div>
                <div className="text-gray-500 mt-2">
                  Marster of mirth, purveyor of puns, and the funniest in the
                  kingdom
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
