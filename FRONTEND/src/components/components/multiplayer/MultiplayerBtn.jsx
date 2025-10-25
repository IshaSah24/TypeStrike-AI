import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import battle from "../../../assets/battle.svg";
import { fetchCurrentUser } from "../../../features/auth/authSlice";

const MultiplayerBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const result = await dispatch(fetchCurrentUser()).unwrap();
      console.log("after  click  data :", result);

      if (result) {
        navigate({ to: "/play/multiplayer" });   // earlier   : "/comingsoon"
      } else {
        navigate({ to: "/login" });
      }
    } catch (err) {
      navigate({ to: "/login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-light text-lg hover:bg-white/10 transition-all duration-300 border border-white/10 shadow-md"
    >
      <img src={battle} alt="Battle" className="w-5 h-5" />
      {loading ? "Checking..." : "Battle"}
      <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );
};

export default MultiplayerBtn;
