import React from "react";

type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
};
// (props: InputProps) cách khác
const Input = ({
  name,
  value,
  onChange,
  className,
  onKeyDown,
  disabled,
  type = "text",
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      type={type}
      placeholder={"Enter " + name}
      className={`flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-300 rounded-full ${className}`}
    />
  );
};

export default Input;
