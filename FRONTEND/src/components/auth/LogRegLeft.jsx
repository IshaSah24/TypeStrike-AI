import React from "react";
import { motion } from "framer-motion";
import RegisterPage from "./RegisterFeature";
import LeftLoginContent from "./LoginFeature";
import LoginFeature from "./LoginFeature";
import RegisterFeature from "./RegisterFeature";
const LogRegLeft = ({isLogin}) => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 text-white p-12 relative overflow-hidden">
    
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 via-neutral-800/10 to-neutral-900/30"></div>

      <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-white/[0.08] via-white/[0.03] to-transparent rounded-full -top-64 -left-64 blur-3xl"></div>

      <div className="absolute w-[300px] h-[300px] bg-gradient-radial from-neutral-300/[0.06] via-neutral-400/[0.02] to-transparent rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>

      <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-neutral-200/[0.04] via-neutral-300/[0.015] to-transparent rounded-full -bottom-48 -right-48 blur-3xl"></div>


      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>


      <div className="absolute w-2 h-2 bg-white/10 rounded-full top-20 left-20 animate-pulse"></div>
      <div
        className="absolute w-1 h-1 bg-white/15 rounded-full top-40 right-32 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute w-1.5 h-1.5 bg-white/8 rounded-full bottom-32 left-16 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute w-1 h-1 bg-white/12 rounded-full bottom-20 right-20 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center"
      >
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-16 h-16 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white/80 rounded-lg shadow-lg"></div>
          </div>
        </motion.div>

        <h1 className="text-5xl font-extralight mb-6 text-white leading-tight tracking-wide">
          {isLogin ? "Welcome" : "Begin"}
          <span className="block text-3xl font-thin text-neutral-200/80 mt-3 tracking-wider">
            {isLogin ? "Back" : "Your Journey"}
          </span>
        </h1>

        <p className="text-neutral-300/70 text-lg leading-relaxed max-w-md mx-auto mb-12 font-extralight tracking-wide">
          {isLogin
            ? "Step into your sanctuary of creativity and innovation."
            : "Embark on a journey of limitless possibilities and refined experiences."}
        </p>

        
        <div className="space-y-6 text-neutral-400/60 text-sm font-extralight tracking-wider">
          {isLogin ? (
            <LoginFeature />
          ) : (
            <RegisterFeature />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/5"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default LogRegLeft;
