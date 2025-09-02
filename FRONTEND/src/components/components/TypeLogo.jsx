import { Zap } from "lucide-react";
import React from "react";
import HeaderOptions from "./HeaderOptions";
import { useNavigate, useRouter } from "@tanstack/react-router";
const TypeLogo = ({ showHeader, onClick }) => {

  const navigate = useNavigate();
  const router = useRouter();
  
  const handleClick = (e) => {
    
    const currentPath = router.state.location.pathname;
    if (currentPath === "/typing") {
      console.log(currentPath);
      
      // Already on /typing → just run the blur-prevention logic
      if (onClick){
        onClick(e);
      }
    } 
    else {
      console.log("clicked");
      // Navigate to typing
      navigate({ to: "/typing" });
      
    }
  };


  return (
    <div className=" w-full flex justify-between">
      <div  onClick={handleClick}
        className="flex items-center space-x-4 p-6 cursor-default"
      >
        <div className="bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded">
          <Zap className=" bg-[var(--color-bg)]  text-[var(--color-text)]  w-8 h-8 " />
        </div>
        <h1
          className={`text-xl font-semibold text-grey-500${
            showHeader ? "opacity-100" : "opacity-20"
          }`}
        >
          Speedstrike
        </h1>
      </div>

      <HeaderOptions />
    </div>
  );
};

export default TypeLogo;












// import { Zap } from "lucide-react";
// import React from "react";
// import HeaderOptions from "./HeaderOptions";

// const TypeLogo = ({ showHeader, onClick }) => {
//   return (
//     <div className=" w-full flex justify-between">
//       <div
//         onClick={onClick}
//         className="flex items-center space-x-4 p-6 cursor-default"
//       >
//         <div className="bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded">
//           <Zap className=" bg-[var(--color-bg)]  text-[var(--color-text)]  w-8 h-8 " />
//         </div>
//         <h1
//           className={`text-xl font-semibold text-grey-500${
//             showHeader ? "opacity-100" : "opacity-20" 
//           }`}
//         >
//           Speedstrike
//         </h1>
//       </div>

//       <HeaderOptions />
//     </div>
//   );
// };

// export default TypeLogo;
