import React, { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import HeaderOptions from "./HeaderOptions";

const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed.user || null;
  } catch {
    return null;
  }
};

const TypeLogo = ({ onClick }) => {
  const navigate = useNavigate();
  const router = useRouter();

  const [user, setUser] = useState(getUserFromStorage);
  const [open, setOpen] = useState(false);

  const handleLogoClick = (e) => {
    const path = router.state.location.pathname;
    path === "/play/single" ? onClick?.(e) : navigate({ to: "/play/single" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate({ to: "/login" });
  };

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase();

  return (
    <div className="w-full flex justify-between items-center px-8 py-2">
      <div className="inline-flex items-center space-x-2 group cursor-pointer">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 rounded-xl blur-md group-hover:blur-xl transition-all duration-500"
            style={{
              background: `linear-gradient(
          135deg,
          var(--primary-color) 0%,
          rgba(255,255,255,0.05) 50%,
          var(--primary-color) 80%
        )`,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl border backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-500 group-hover:shadow-xl"
            style={{
              background: `linear-gradient(
          135deg,
          var(--header-bg),
          var(--bg-color)
        )`,
              borderColor: "var(--primary-color)",
            }}
          >
            <span
              className="text-2xl font-bold text-transparent bg-clip-text transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(
            135deg,
            var(--header-text),
            var(--text-color)
          )`,
              }}
            >
              T
            </span>
          </div>
        </div>

        <div onClick={handleLogoClick} className="flex flex-col -space-y-1">
          <div className="flex items-baseline">
            <span
              className="text-md font-extralight tracking-widest transition-all duration-500 group-hover:tracking-wider"
              style={{ color: "var(--text-color)" }}
            >
              Type
            </span>
            <span
              className="text-xl font-bold ml-1 transition-all duration-500 group-hover:tracking-wider"
              style={{ color: "var(--header-text)" }}
            >
              Strike
            </span>
            <span
              className="text-md font-light ml-1 transition-all duration-500"
              style={{ color: "var(--text-color)" }}
            >
              .Ai
            </span>
          </div>
          <div
            className="h-[1px] w-0 group-hover:w-full transition-all duration-500 mt-1"
            style={{
              background: `linear-gradient(
          to right,
          transparent,
          var(--primary-color),
          transparent
        )`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <HeaderOptions user={user} />

        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-slate-800 border border-slate-600 text-slate-200 font-semibold"
            >
              {firstLetter}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-lg">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-medium text-slate-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>

                <button
                  onClick={() => navigate({ to: "/profile" })}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
                >
                  View Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
        //   <button
        //     onClick={() => navigate({ to: "/login" })}
        //     className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200"
        //   >
        //     Login
        //   </button>
        // 
      <button></button>
        )}
      </div>
    </div>
  );
};

export default TypeLogo;
