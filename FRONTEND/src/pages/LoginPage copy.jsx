import { useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github, Eye, EyeOff } from "lucide-react";
import RegisterPage from "../components/auth/RegisterFeature";
import LogRegLeft from "../components/auth/LogRegLeft";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      <div className="relative w-full max-w-5xl min-h-[500px] bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800/50 overflow-hidden grid md:grid-cols-2">
        
   
        <LogRegLeft isLogin ={isLogin} /> 
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              {isLogin ? "Access your workspace" : "Start your creative journey"}
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
              <span className="mx-4 text-xs text-neutral-500 font-light tracking-wide uppercase">Or continue with email</span>
              <hr className="flex-1 border-neutral-700/50" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
                  />
                </div>
              )}
              
              <div className="group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
                />
              </div>
              
              <div className="group relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-4 pr-12 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {!isLogin && (
                <div className="group relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full p-4 pr-12 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </motion.div>

            {isLogin && (
              <div className="flex items-center justify-between mt-6 mb-8">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 accent-neutral-500 scale-110" />
                  <span className="text-sm text-neutral-400/80 font-extralight tracking-wide">Remember me</span>
                </label>
                <button className="text-sm text-neutral-400/80 hover:text-white/90 transition-all duration-300 font-extralight tracking-wide hover:tracking-wider">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="w-full mt-8 bg-gradient-to-r from-white via-neutral-50 to-white text-black py-4 rounded-xl hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 font-light tracking-[0.1em] shadow-2xl hover:shadow-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <span className="relative z-10 uppercase text-sm font-medium tracking-[0.15em]">
                {isLogin ? "Sign In" : "Create Account"}
              </span>
            </motion.button>

            {!isLogin && (
              <p className="mt-6 text-xs text-neutral-500/60 text-center leading-relaxed font-extralight tracking-wide">
                By creating an account, you agree to our{" "}
                <button className="text-neutral-400/80 hover:text-white/90 transition-all duration-300 underline underline-offset-2 hover:underline-offset-4">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-neutral-400/80 hover:text-white/90 transition-all duration-300 underline underline-offset-2 hover:underline-offset-4">
                  Privacy Policy
                </button>
              </p>
            )}

            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
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


