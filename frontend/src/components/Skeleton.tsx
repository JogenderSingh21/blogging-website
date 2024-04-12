import { Avatar } from "./BlogCard";

const SkeletonCard = () => {
  return (
    <div role="status" className="animate-pulse w-full">
      <div className="border-b pb-8 pt-5 mx-6 cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar name={" "} size="small"></Avatar>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
          <div className="w-0.5 h-0.5 bg-gray-300 rounded-full "></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-2/3 mt-4 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>

        <div className="mt-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      </div>
    </div>
  );
};

export const SkeletonBlog = () => {
  return (
    <div
      role="status"
      className="grid grid-cols-2 lg:grid-cols-3 m-6 lg:my-14 lg:mx-20 lg:gap-5 animate-pulse w-full"
    >
      <div className="col-span-2 gap-5 flex flex-col mr-14 lg:m-0">
        <div className="text-5xl font-bold bg-slate-300 h-3 rounded-full w-2/3 my-2"></div>
        <div className="text-slate-500 h-2 w-48 bg-gray-200 rounded-full mb-2.5"></div>
        <div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-2/3"></div>
        </div>
        <div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-10/12"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-2/3"></div>
        </div>
        <div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
        </div>
      </div>
      <div className="blogAuthor">
        <div className="font-medium text-gray-800">Author</div>
        <div className="flex gap-4 mt-4 items-center">
          <div>
            <Avatar name={" "} size={"small"}></Avatar>
          </div>
          <div className="w-full">
            <div className="text-2xl font-bold h-2.5 bg-slate-200 rounded-full w-48"></div>
            <div className="text-gray-500 mt-4 h-2 bg-slate-200 rounded-full w-2/3"></div>
            <div className="text-gray-500 mt-2.5 h-2 bg-slate-200 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
