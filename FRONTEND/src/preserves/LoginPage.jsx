import { useState } from "react";
import { motion  } from "framer-motion";
import { Chrome, Github, Eye, EyeOff } from "lucide-react";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      <div className="relative w-full max-w-5xl min-h-[700px] bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800/50 overflow-hidden grid md:grid-cols-2">
        
        {/* Left side - Elegant branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 text-white p-12 relative overflow-hidden">
          
          {/* Sophisticated ambient lighting system */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 via-neutral-800/10 to-neutral-900/30"></div>
          
          {/* Primary light source - top left */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-white/[0.08] via-white/[0.03] to-transparent rounded-full -top-64 -left-64 blur-3xl"></div>
          
          {/* Secondary light - center */}
          <div className="absolute w-[300px] h-[300px] bg-gradient-radial from-neutral-300/[0.06] via-neutral-400/[0.02] to-transparent rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          
          {/* Accent light - bottom right */}
          <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-neutral-200/[0.04] via-neutral-300/[0.015] to-transparent rounded-full -bottom-48 -right-48 blur-3xl"></div>
          
          {/* Subtle edge lighting */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
          
          {/* Floating particles for depth */}
          <div className="absolute w-2 h-2 bg-white/10 rounded-full top-20 left-20 animate-pulse"></div>
          <div className="absolute w-1 h-1 bg-white/15 rounded-full top-40 right-32 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-1.5 h-1.5 bg-white/8 rounded-full bottom-32 left-16 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute w-1 h-1 bg-white/12 rounded-full bottom-20 right-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 text-center"
          >
            {/* Elegant logo/brand mark */}
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

            {/* Elegant feature highlights */}
            <div className="space-y-6 text-neutral-400/60 text-sm font-extralight tracking-wider">
              {isLogin ? (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Seamless Authentication</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Elevated Experience</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Premium Security</span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Complimentary Access</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Curated Community</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center gap-4 justify-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-all duration-500"></div>
                    <span className="group-hover:text-neutral-300/80 transition-all duration-500">Infinite Potential</span>
                  </motion.div>
                </>
              )}
            </div>
            
            {/* Subtle signature line */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 pt-8 border-t border-white/5"
            >
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Form */}
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

            {/* Social login buttons */}
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

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-neutral-700/50" />
              <span className="mx-4 text-xs text-neutral-500 font-light tracking-wide uppercase">Or continue with email</span>
              <hr className="flex-1 border-neutral-700/50" />
            </div>

            {/* Form inputs */}
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

            {/* Remember me / Forgot password */}
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

            {/* Submit button */}
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

            {/* Terms for registration */}
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

            {/* Switch between login/register */}
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









// ------------------------------------------------------



// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Chrome, Github, Eye, EyeOff } from "lucide-react";

// export default function LoginRegister() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
//       <div className="relative w-full max-w-5xl min-h-[650px] bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800/50 overflow-hidden grid  md:grid-cols-[0.50fr_0.62fr]">
        
//         {/* Left side - Elegant branding */}
//         <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 text-white p-12 relative overflow-hidden">
          
//           {/* Subtle ambient lighting */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-neutral-700/10 via-transparent to-neutral-600/10"></div>
//           <div className="absolute w-96 h-96 bg-white opacity-[0.02] rounded-full -top-48 -left-48 blur-3xl"></div>
//           <div className="absolute w-80 h-80 bg-white opacity-[0.01] rounded-full -bottom-40 -right-40 blur-3xl"></div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative z-10 text-center"
//           >
//             <h1 className="text-5xl font-light mb-6 text-white leading-tight tracking-tight">
//               {isLogin ? "Welcome" : "Begin"}
//               <span className="block text-3xl font-extralight text-neutral-300 mt-2">
//                 {isLogin ? "Back" : "Your Journey"}
//               </span>
//             </h1>

//             <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto mb-8 font-light">
//               {isLogin
//                 ? "Continue where you left off. Your workspace awaits."
//                 : "Join a community of creators and innovators building the future."}
//             </p>

//             {/* Elegant feature highlights */}
//             <div className="space-y-4 text-neutral-500 text-sm font-light">
//               {isLogin ? (
//                 <>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Secure authentication</span>
//                   </div>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Seamless experience</span>
//                   </div>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Your data, protected</span>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Free to get started</span>
//                   </div>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Connect with creators</span>
//                   </div>
//                   <div className="flex items-center gap-3 justify-center">
//                     <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
//                     <span>Build something amazing</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         {/* Right side - Form */}
//         <motion.div
//           key={isLogin ? "login" : "register"}
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -30 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="p-12 flex flex-col justify-center bg-neutral-900/90"
//         >
//           <div className="max-w-sm mx-auto w-full">
//             <motion.h2 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-3xl font-light text-white mb-2 tracking-tight"
//             >
//               {isLogin ? "Sign In" : "Create Account"}
//             </motion.h2>
            
//             <motion.p 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-neutral-400 text-sm mb-8 font-light"
//             >
//               {isLogin ? "Access your workspace" : "Start your creative journey"}
//             </motion.p>

//             {/* Social login buttons */}
//             <motion.div 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="flex gap-4 mb-8"
//             >
//               <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-300 group">
//                 <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
//                 <span className="text-sm font-medium">Google</span>
//               </button>
//               <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-300 group">
//                 <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
//                 <span className="text-sm font-medium">GitHub</span>
//               </button>
//             </motion.div>

//             {/* Divider */}
//             <div className="flex items-center my-6">
//               <hr className="flex-1 border-neutral-700/50" />
//               <span className="mx-4 text-xs text-neutral-500 font-light tracking-wide uppercase">Or continue with email</span>
//               <hr className="flex-1 border-neutral-700/50" />
//             </div>

//             {/* Form inputs */}
//             <motion.div 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="space-y-4"
//             >
//               {!isLogin && (
//                 <div className="group">
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
//                   />
//                 </div>
//               )}
              
//               <div className="group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
//                 />
//               </div>
              
//               <div className="group relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="w-full p-4 pr-12 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
              
//               {!isLogin && (
//                 <div className="group relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     className="w-full p-4 pr-12 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               )}
//             </motion.div>

//             {/* Remember me / Forgot password */}
//             {isLogin && (
//               <div className="flex items-center justify-between mt-4 mb-6">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 accent-neutral-600" />
//                   <span className="text-sm text-neutral-400 font-light">Remember me</span>
//                 </label>
//                 <button className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
//                   Forgot password?
//                 </button>
//               </div>
//             )}

//             {/* Submit button */}
//             <motion.button 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.99 }}
//               className="w-full mt-6 bg-white text-black py-4 rounded-xl hover:bg-neutral-100 transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-xl"
//             >
//               {isLogin ? "Sign In" : "Create Account"}
//             </motion.button>

//             {/* Terms for registration */}
//             {!isLogin && (
//               <p className="mt-4 text-xs text-neutral-500 text-center leading-relaxed font-light">
//                 By creating an account, you agree to our{" "}
//                 <button className="text-neutral-400 hover:text-white transition-colors underline">
//                   Terms of Service
//                 </button>{" "}
//                 and{" "}
//                 <button className="text-neutral-400 hover:text-white transition-colors underline">
//                   Privacy Policy
//                 </button>
//               </p>
//             )}

//             {/* Switch between login/register */}
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//               className="mt-8 text-sm text-neutral-400 text-center font-light"
//             >
//               {isLogin ? "New here?" : "Already have an account?"}{" "}
//               <button
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-white font-medium hover:underline transition-all duration-300"
//               >
//                 {isLogin ? "Create an account" : "Sign in instead"}
//               </button>
//             </motion.p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }