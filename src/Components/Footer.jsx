import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-indigo-950 items-center text-white bottom-0 w-full h-11 justify-center gap-4">
      <div className="logo font-bold text-white cursor-pointer text-xl">
        <span className="text-green-600">&lt;</span>
        Pass
        <span className="text-green-600">Man/&gt;</span>
      </div>
      <div>&copy; Created by MS</div>
    </div>
  );
};

export default Footer;
