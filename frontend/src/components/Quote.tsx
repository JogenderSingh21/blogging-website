const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="max-w-lg flex flex-col">
          <div className="text-2xl font-bold ">
            "The customer support I recieved was exceptional the support team
            went above and beyound to address my concerns."
          </div>
          <div className="mt-3 font-bold text-lg">Jules Winnfield</div>
          <div className="text-gray-500 text-sm font-semibold">
            CEO, Acme Inc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
