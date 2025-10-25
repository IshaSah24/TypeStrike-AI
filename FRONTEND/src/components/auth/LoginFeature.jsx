import React from "react";
import { motion } from "framer-motion";
const LoginFeature = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 justify-center group"
      >
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
        <span className="group-hover:text-neutral-300/80 transition-all duration-500">
          Seamless Authentication
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-4 justify-center group"
      >
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
        <span className="group-hover:text-neutral-300/80 transition-all duration-500">
          Elevated Experience
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="flex items-center gap-4 justify-center group"
      >
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
        <span className="group-hover:text-neutral-300/80 transition-all duration-500">
          Premium Security
        </span>
      </motion.div>
    </>
  );
};

export default LoginFeature;
