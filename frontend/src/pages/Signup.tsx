import Auth from "../components/Auth";
import Quote from "../components/Quote";
import { useAuth } from "../hooks";
import { Spinner } from "./Root";

export const Signup = () => {
  const { authLoading } = useAuth("signup");
  return (
    <div className="lg:grid lg:grid-cols-2">
      {authLoading && <Spinner></Spinner>}
      <div>
        <Auth type="signup"></Auth>
      </div>
      <div className="quotes">
        <Quote></Quote>
      </div>
    </div>
  );
};
