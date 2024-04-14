// ResizableTextarea.tsx

import React, { useRef } from "react";

interface ResizableTextareaProps {
  placeholder?: string;
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  placeholder = "",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = () => {
    if (textareaRef.current) {
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  return (
    <textarea
      className=" border rounded-md p-2 text-base focus:outline-none focus:border-blue-500 no-scrollbar"
      placeholder={placeholder}
      ref={textareaRef}
      onInput={handleInputChange}
    />
  );
};

export default ResizableTextarea;
