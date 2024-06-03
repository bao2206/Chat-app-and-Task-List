import React from "react";
import Spinner from "./Spinner";
import { wait } from "@testing-library/user-event/dist/utils";
type ButtonProps = {
  text?: string;
  className?: string;
  secondary?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

const Button = ({
  text = "Button",
  className,
  secondary,
  onClick,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      className={`py-2 px-9 rounded-full items-center flex justify-center gap-3 text-white border-2 border-white hover:bg-myPurple transition-all hover: drop-shadow-lg ${
        secondary ? "bg-myPurple" : "bg-myBlue"
      } ${className} ${loading && "cursor-wait"}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
};

export default Button;
