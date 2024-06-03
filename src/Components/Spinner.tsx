import React from "react";
type SpinnerProps = {};
const Spinner = ({}: SpinnerProps) => {
  return (
    <div className=" animate-spin border-2 w-5 h-5 rounded-full border-t-myBlue"></div>
  );
};

export default Spinner;
