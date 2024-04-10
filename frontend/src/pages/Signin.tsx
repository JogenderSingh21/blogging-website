import Auth from "../components/Auth";
import Quote from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div>
        <Auth type="signin"></Auth>
      </div>
      <div className="invisible lg:visible">
        <Quote></Quote>
      </div>
    </div>
  );
};
