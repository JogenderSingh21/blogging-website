import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@jojosehrawat/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Spin } from "../pages/Root";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const userDetails = response.data.userDetails;
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  }

  return (
    <div className="bg-white h-screen flex  justify-center">
      <div className="flex flex-col justify-center w-96 px-5">
        <div className="text-3xl font-bold text-center">
          {type === "signup" ? "Create an account" : "Sign in to your account"}
        </div>
        <div className="text-center mt-2 text-gray-500 ">
          {type === "signup" ? "Already have an account? " : "Not registered? "}
          <Link to={type === "signup" ? "/signin" : "/signup"}>
            <span className="hover:underline text-blue-500">
              {type === "signup" ? "Login here" : "Create an account."}
            </span>
          </Link>
        </div>
        <div className="mt-8 gap-4 flex flex-col">
          {type === "signup" && (
            <InputBox
              label="Full Name"
              placeholder="John Doe"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            ></InputBox>
          )}

          <InputBox
            label="Email"
            placeholder="johndoe@example.com"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                username: e.target.value,
              }));
            }}
          ></InputBox>

          <InputBox
            label="Password"
            type={"password"}
            placeholder="•••••••••"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          ></InputBox>
          <button
            type="button"
            onClick={sendRequest}
            className={`text-white   focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 relative ${
              loading ? "bg-gray-700" : "bg-gray-900 hover:bg-gray-950"
            }`}
            disabled={loading}
          >
            <div className="mr-3 absolute left-20" hidden={!loading}>
              <Spin size="small"></Spin>
            </div>
            <span>
              {type === "signup" ? "Create account" : "Sign in to account"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface InputBoxType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ label, placeholder, type, onChange }: InputBoxType) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
