import React, { useRef, ReactNode } from "react";

// 定义Props的类型
interface UploadProps {
  children: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Upload: React.FC<UploadProps> = ({ children, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onChange}
      />
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </div>
    </div>
  );
};

export default Upload;
