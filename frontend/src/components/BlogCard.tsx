import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={"/blog/" + id}>
      <div className="border-b pb-8 pt-5 mx-6 cursor-pointer">
        <div className="flex items-center gap-2">
          <div>
            <Avatar name={authorName} size="small"></Avatar>
          </div>
          <div className="">{authorName}</div>
          <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
          <div className="text-gray-400 text-[14px]">
            {publishedDate.slice(4)}
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-3 mb-1">{title}</h2>
        <div className="text-gray-600 line-clamp-2">{content}</div>
        <div className="mt-6 text-gray-400 text-sm">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
      </div>
    </Link>
  );
};

export const Avatar = ({
  name,
  size,
}: {
  name: string;
  size: "big" | "small";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-medium text-gray-600 dark:text-gray-300  ${
          size == "small" ? "text-sm" : "text-lg"
        }`}
      >
        {name[0]}
      </span>
    </div>
  );
};
