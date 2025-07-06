import { Zap } from "lucide-react";
import React from "react";

const TypeLogo = ({showHeader, onClick}) => {
  return (
    
    <div onClick={onClick}  
     className="flex items-center space-x-4 absolute top-0 left-20 p-6 cursor-default">
      <div className="bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded">
        <Zap className=" bg-[var(--color-bg)]  text-[var(--color-text)]  w-8 h-8 " />
      </div>
      <h1
        className={`text-xl font-semibold text-grey  ${
          showHeader ? "opacity-100" : "opacity-20"
        }`}
      >speedtype
      </h1>
    </div>
  );
};

export default TypeLogo;
