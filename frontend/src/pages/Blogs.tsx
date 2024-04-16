import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import SkeletonCard from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div>
      <div className="sticky top-0 z-40">
        <Appbar></Appbar>
      </div>
      <div className="flex justify-center">
        <div className="flex-col max-w-screen-lg">
          {loading ? (
            <>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
            </>
          ) : (
            blogs.map((blog) => {
              return (
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  publishedDate={`${new Date().toDateString()}`}
                  content={blog.content}
                ></BlogCard>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
