import { useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github, Eye, EyeOff } from "lucide-react";
import LogRegLeft from "../components/auth/LogRegLeft";
import LoginInput from "../components/auth/LoginInput";
import RegisterInput from "../components/auth/RegisterInput";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      <div className="relative w-full max-w-5xl min-h-[500px] bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800/50 overflow-hidden grid md:grid-cols-2">

        <LogRegLeft isLogin={isLogin} />
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.06, ease: "easeOut" }}
          className="p-12 flex flex-col justify-center bg-neutral-900/90"
        >
          <div className="max-w-sm mx-auto w-full">
    
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-light text-white mb-2 tracking-tight"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-400 text-sm mb-8 font-light"
            >
              {isLogin
                ? "Access your workspace"
                : "Start your creative journey"}
            </motion.p>

          
                
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mb-8"
            >
              <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-300 group">
                <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-300 group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </motion.div>
          
            <div className="flex items-center my-6">
              <hr className="flex-1 border-neutral-700/50" />
              <span className="mx-4 text-xs text-neutral-500 font-light tracking-wide uppercase">
                Or continue with email
              </span>
              <hr className="flex-1 border-neutral-700/50" />
            </div>

            
            <div className="space-y-4">
              {isLogin ? <LoginInput /> : <RegisterInput/>}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.07 }}
              className="mt-10 text-sm text-neutral-400/70 text-center font-extralight tracking-wide"
            >
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/90 font-light hover:underline transition-all duration-300 tracking-wide hover:tracking-wider"
              >
                {isLogin ? "Create an account" : "Sign in instead"}
              </button>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
