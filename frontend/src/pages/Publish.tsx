import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Appbar from "../components/Appbar";
import "../components/TextEditor.css";
import warning from "../assets/warning.svg";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "fit-content";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const [userInfo, setuserInfo] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const onChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 150) {
      setuserInfo({
        ...userInfo,
        title: inputValue.slice(0, 150),
      });
    }
  };
  const ondescription = (value: any) => {
    console.log("ondescription");
    setuserInfo({ ...userInfo, content: value });
  };

  const handlePublish = () => {
    console.log("jogender");
    if (
      userInfo.title.length < 10 ||
      userInfo.title.length > 150 ||
      userInfo.content.length < 300
    ) {
      console.log(userInfo.title.length, userInfo.content.length);
      alert("incorrect inputs");
      return;
    }

    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/signup");
      return;
    }

    const token = JSON.parse(userDetails).token;
    axios
      .post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: userInfo.title,
          content: userInfo.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/blog/" + response.data.id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="sticky top-0 left-0 right-0 z-30">
        <Appbar toPublish={true} onClick={handlePublish}></Appbar>
      </div>
      <div className="flex justify-center px-6 mt-3 lg:mt-6">
        <div className="w-full max-w-screen-md">
          <div className="sticky top-0 z-20">
            <div>
              <textarea
                ref={textareaRef}
                onInput={handleInputChange}
                className="w-full text-3xl md-text-5xl font-bold focus:outline-none py-2 text-gray-800 resize-none no-scrollbar h-fit"
                rows={1}
                name="title"
                value={userInfo.title}
                onChange={onChangeTitle}
                placeholder="Title"
                required
              />
              <div className="text-gray-400 flex gap-2 items-center">
                <img
                  hidden={userInfo.title.length !== 150 ? true : false}
                  className="w-4 h-4"
                  src={warning}
                  alt="warning"
                ></img>
                <span hidden={userInfo.title.length !== 150 ? true : false}>
                  maximum character limit reached (150)
                </span>
              </div>
            </div>
            <div className="mt-6">
              <EditorToolbar toolbarId={"t1"} />
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <ReactQuill
              theme="snow"
              value={userInfo.content}
              onChange={ondescription}
              placeholder={"Tell your story..."}
              modules={modules("t1")}
              formats={formats}
            />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Publish;
