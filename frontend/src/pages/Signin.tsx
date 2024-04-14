import Auth from "../components/Auth";
import Quote from "../components/Quote";
import { useAuth } from "../hooks";
import { Spinner } from "./Root";

export const Signin = () => {
  const { authLoading } = useAuth({
    success: "blogs",
  });
  return (
    <div className="grid lg:grid-cols-2">
      {authLoading && <Spinner></Spinner>}
      <div>
        <Auth type="signin"></Auth>
      </div>
      <div className="invisible lg:visible">
        <Quote></Quote>
      </div>
    </div>
  );
};
