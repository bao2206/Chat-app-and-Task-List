import React from "react";
import Button from "./Button";
const logo = require("../Assets/logo.png");
type PropsHeader = {};
const Header = ({}: PropsHeader) => {
  return (
    <div className="flex flex-wrap gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPurple px-5 py-5 md:py-2 text-white">
      <img
        src={logo}
        alt="logo"
        className="w-[70px] drop-shadow-md cursor-pointer"
      />
      <div className="flex">
        <Button text="Add new ListBoard" secondary />
      </div>
    </div>
  );
};

export default Header;
