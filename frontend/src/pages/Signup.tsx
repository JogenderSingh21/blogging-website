import Auth from "../components/Auth";
import Quote from "../components/Quote";

export const Signup = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div>
        <Auth type="signup"></Auth>
      </div>
      <div className="invisible lg:visible">
        <Quote></Quote>
      </div>
    </div>
  );
};
