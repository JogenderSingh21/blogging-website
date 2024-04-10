import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div>
      <div className="sticky top-0 z-40">
        <Appbar></Appbar>
      </div>
      <div className="flex justify-center">
        <div className="flex-col max-w-2xl w-[42rem]">
          {loading
            ? "loading..."
            : blogs.map((blog) => {
                return (
                  <BlogCard
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    publishedDate={`${new Date().toDateString()}`}
                    content={blog.content}
                  ></BlogCard>
                );
              })}
          {/* <BlogCard
            authorName="Jogender Singh"
            title="Nam Minima blanditiis doloremque perferendis sit"
            publishedDate={`${new Date().toDateString()}`}
            content={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores eligendi vel molestiae quo velit tenetur aliquid similique aspernatur sed vitae quos magnam accusamus nesciunt accusantium deserunt nam minima blanditiis doloremque perferendis sit, fugiat aliquam mollitia magni."
            }
          ></BlogCard> */}
        </div>
      </div>
    </div>
  );
};
