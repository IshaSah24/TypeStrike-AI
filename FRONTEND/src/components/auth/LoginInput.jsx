import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "@tanstack/react-router";

export default function LoginInput() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      console.log("Login success:", result);
      
      // navigate({ to: "/" });
      const from = location.state?.from?.pathname || "/";
      navigate({ to: from, replace: true });
    } catch (err) {
      console.error(err);
      alert(err || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
   
      <div className="group">
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70"
        />
      </div>

    
      <div className="group relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
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

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <label className="flex items-center">
          <input type="checkbox" className="mr-3 accent-neutral-500 scale-110" />
          <span className="text-sm text-neutral-400/80 font-extralight tracking-wide">
            Remember me
          </span>
        </label>
        <button className="text-sm text-neutral-400/80 hover:text-white/90 transition-all duration-300 font-extralight tracking-wide hover:tracking-wider">
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-8 bg-gradient-to-r from-white via-neutral-50 to-white text-black py-4 rounded-xl hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 font-light tracking-[0.1em] shadow-2xl hover:shadow-white/10 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <span className="relative z-10 uppercase text-sm font-medium tracking-[0.15em]">
          {loading ? "Signing In..." : "Sign In"}
        </span>
      </motion.button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
