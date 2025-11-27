import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterInput() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const result = await dispatch(registerUser({ email, password, name })).unwrap();
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      alert(err || "Registration failed");
    }
  };

  const inputClass =
    "w-full p-4 pr-12 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="group">
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="group">
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className={inputClass}
        />
      </div>

      {/* Password */}
      <div className="group relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="group relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-6 bg-gradient-to-r from-white via-neutral-50 to-white text-black py-4 rounded-xl hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 font-light tracking-[0.1em] shadow-2xl hover:shadow-white/10 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <span className="relative z-10 uppercase text-sm font-medium tracking-[0.15em]">
          {loading ? "Creating Account..." : "Create Account"}
        </span>
      </motion.button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
