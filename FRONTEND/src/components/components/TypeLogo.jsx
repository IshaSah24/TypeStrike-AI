import { Zap } from "lucide-react";
import React from "react";
import HeaderOptions from "./HeaderOptions";
import { useNavigate, useRouter } from "@tanstack/react-router";
const TypeLogo = ({ showHeader, onClick }) => {
  const navigate = useNavigate();
  const router = useRouter();

  const handleClick = (e) => {
    const currentPath = router.state.location.pathname;
    if (currentPath === "/play/single") {
      console.log(currentPath);

      
      if (onClick) {
        onClick(e);
      }
    } else {
      console.log("clicked");
      
      navigate({ to: "/play/single" });
    }
  };

  return (
    <div className=" w-full flex justify-between px-8">
      <div
        onClick={handleClick}
        className="inline-flex items-center space-x-1 group cursor-pointer"
      >
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-slate-500/10 to-slate-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-700 group-hover:from-slate-300/30 group-hover:via-slate-400/20"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black rounded-xl backdrop-blur-sm border border-slate-700/30 group-hover:border-slate-500/50 transition-all duration-500 shadow-2xl"></div>

          <div className="w-full h-full flex items-center justify-center relative z-10 rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 via-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(148,163,184,0.15),transparent_50%)]"></div>

            <div className="relative flex items-center justify-center">
              <div className="relative">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 group-hover:from-white group-hover:via-slate-100 group-hover:to-slate-300 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(148,163,184,0.4)]">
                  T
                </span>
                <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                  <span className="text-2xl font-bold text-slate-300">T</span>
                </div>

                <div className="absolute -top-[1.8px] right-[-4px] w-2 h-2 bg-slate-400 rounded-full animate-ping opacity-95 group-hover:bg-slate-300"></div>
                <div className="absolute -top-[1.8px] right-[-4px] opacity-[.5] w-[3px] h-[3px] bg-slate-300 rounded-full shadow-[0_0_8px_rgba(148,163,184,0.8)] group-hover:shadow-[0_0_12px_rgba(226,232,240,1)]"></div>
              </div>
            </div>
          </div>

          <div className="absolute -inset-1 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-700"></div>
        </div>

        <div className="flex flex-col -space-y-1">
          <div className="flex items-baseline mb-[.4]">
            <span className="text-md font-extralight text-slate-300 tracking-[0.1em] group-hover:tracking-[0.15em] transition-all duration-500">
              Type
            </span>
            <span className="text-xl font-bold text-slate-100 tracking-[0.1em] group-hover:tracking-[0.15em] group-hover:text-white transition-all duration-500">
              Strike
            </span>
            <span className="text-md font-light text-slate-400 tracking-wide group-hover:text-slate-300 transition-colors duration-500">
              .Ai
            </span>
          </div>
          <div className="h-[1.2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-all duration-500"></div>
        </div>
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
