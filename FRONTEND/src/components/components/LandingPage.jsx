import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Zap,
  Target,
  Trophy,
  Users,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  Play,
  Sparkles,
  Award,
  BarChart3,
  Sun,
  Mail,
  Phone,
  MapPin,
  Bot,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import zig from "./../../assets/TLP.png";
import UpcomingFeature from "./multiplayer/UpcomingFeature";
import battle from "../../assets/battle.svg";
import { fetchCurrentUser } from "../../features/auth/authSlice";
import MultiplayerBtn from "./multiplayer/MultiplayerBtn";
import LandingAuthBtns from "./Landing-auth-btns";
import CreateJoinRoomPage from "../../pages/CreateJoinRoomPage";
import Footer from "./Footer";
import PricingPlans from "./PricingPlans";
import BottomFixedNav from "./BottomFixedNav";

function App() {
    const handlePlayBot = () => {
    console.log('Navigate to /play/bot');
  };

  const handleWatchDemo = () => {
    console.log('Open demo modal');
  };
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const floatingLetters = [
    "A",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
  ];

  useEffect(() => {
    try {
      sessionStorage.setItem("appVisited", "1");
    } catch (e) {}

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative overflow-hidden">
      <div className="relative">
        {/* Add at the very top of your component */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></div>
                  <span className="text-sm font-light text-white tracking-wide">
                    ✨ NEW FEATURE:
                  </span>
                </div>
                <span className="text-sm text-white/90 font-light">
                  Compete with Adaptive AI is now live!
                </span>
                <button
                  onClick={() => navigate({ to: "/play/bot" })}
                  className="ml-2 px-3 py-1 text-xs bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all duration-300"
                >
                  Try Now →
                </button>
              </div>
            </div>
          </div>
        </div>
        <nav
          className={`fixed inset-x-0 top-14 z-50 mx-auto w-[95%] max-w-7xl lg:w-full rounded-full px-4 py-2 transition-all duration-300 ${
            scrolled
              ? "bg-white/30 dark:bg-neutral-900/40 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div
            className="absolute inset-0 rounded-full bg-white/10 dark:bg-neutral-900/40 shadow-md transition-all duration-300"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, white, transparent, white)",
              maskImage:
                "linear-gradient(to bottom, white, transparent, white)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              background: scrolled ? "#ffffff36" : "#ffffff0a",
            }}
          />

          <div className="flex items-center justify-between relative z-10 py-[1px] px-2">
            <div className="inline-flex items-center space-x-2 group cursor-pointer">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-600/10 via-slate-700/5 to-slate-800/5 blur-md group-hover:blur-xl transition-all duration-500"></div>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-900 border border-slate-700/30 backdrop-blur-sm shadow-lg group-hover:border-slate-500/50 transition-all duration-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 group-hover:from-white group-hover:via-slate-100 group-hover:to-slate-300 transition-all duration-500">
                    T
                  </span>
                </div>
              </div>

              <div className="flex flex-col -space-y-1">
                <div className="flex items-baseline">
                  <span className="text-md font-extralight text-slate-300 tracking-widest group-hover:tracking-wider transition-all duration-500">
                    Type
                  </span>
                  <span className="text-xl font-bold text-slate-100 group-hover:text-white tracking-wider transition-all duration-500 ml-1">
                    Strike
                  </span>
                  <span className="text-md font-light text-slate-400 group-hover:text-slate-300 ml-1">
                    .Ai
                  </span>
                </div>
                <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-all duration-500 mt-1"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between gap-8">
                <button
                  onClick={() => {
                    navigate({ to: "/dashboard" });
                  }}
                  className="cursor-pointer group text-gray-500 hover:text-white rounded-lg font-medium text-base transition-all duration-00 flex items-center"
                >
                  <BarChart3 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-100" />
                  <span className="tracking-wide">Dashboard</span>
                </button>
                <LandingAuthBtns />
              </div>
            </div>
          </div>
        </nav>
        <div className="h-20"></div>
      </div>
      <div className=" min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
        <section className="relative px-6 py-32 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingLetters.map((letter, i) => {
              const size = 12 + Math.random() * 8;
              const leftPos = Math.random() * 100;
              const topPos = Math.random() * 100;
              const animDuration = 15 + Math.random() * 10;
              const animDelay = Math.random() * 8;

              return (
                <div
                  key={i}
                  className="absolute font-extralight select-none opacity-[0.08] text-neutral-400"
                  style={{
                    fontSize: `${size}px`,
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                    animation: `gentleFloat ${animDuration}s infinite ease-in-out`,
                    animationDelay: `${animDelay}s`,
                    filter: "blur(0.5px)",
                  }}
                >
                  {letter}
                </div>
              );
            })}

            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `elegantFloat ${
                    20 + Math.random() * 15
                  }s infinite linear`,
                  animationDelay: `${Math.random() * 15}s`,
                  boxShadow: "0 0 4px currentColor",
                }}
              />
            ))}

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-3xl rotate-12 transform hover:rotate-6 transition-transform duration-1000 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Keyboard close-up"
                className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500"
              />
            </div>

            <div className="absolute top-1/4 -right-40 w-80 h-80 bg-white/5 rounded-3xl -rotate-12 transform hover:rotate-6 transition-transform duration-1000 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Typing hands"
                className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500"
              />
            </div>

            <div className="absolute bottom-20 -left-24 w-72 h-72 bg-white/5 rounded-3xl rotate-6 transform hover:-rotate-6 transition-transform duration-1000 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mechanical keyboard"
                className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500"
              />
            </div>

            <div className="absolute top-40 left-1/4 w-64 h-48 bg-white/5 rounded-3xl -rotate-6 transform hover:rotate-3 transition-transform duration-1000 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden hidden lg:block">
              <img
                src="https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Laptop typing"
                className="w-full h-full object-cover opacity-30 hover:opacity-50 transition-opacity duration-500"
              />
            </div>

            <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-white/5 rounded-3xl rotate-12 transform hover:-rotate-12 transition-transform duration-1000 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden hidden lg:block">
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern workspace"
                className="w-full h-full object-cover opacity-30 hover:opacity-50 transition-opacity duration-500"
              />
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col gap-8 items-center">
            <div className="inline-flex w-fit mb-8 items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <Sparkles className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-light tracking-wider">
                Master Your Typing Craft
              </span>
            </div>

            <div className="mb-12 relative">
              <h1 className="text-6xl md:text-8xl font-medium text-white mb-8 leading-tight tracking-none">
                Type Like a{" "}
                <span
                  style={{ fontFamily: "Randelles" }}
                  className="relative font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white"
                >
                  Virtuoso
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-2xl"></div>
                </span>
              </h1>
              <p className="text-md md:text-md text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed font-extralight tracking-wide">
                Elevate your typing prowess with our sophisticated training
                platform. Experience precision, speed, and elegance in every
                keystroke.
              </p>
            </div>

            <div className=" flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => {
                  navigate({ to: "/play/single" });
                }}
                className="group cursor-pointer bg-gradient-to-r from-white via-neutral-50 to-white text-black px-10 py-4 rounded-xl font-medium text-lg hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 flex items-center shadow-2xl hover:shadow-white/10 relative overflow-hidden"
              >
                <div className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 tracking-wide ">
                  Begin Training
                </span>
              </button>

              <button
                onClick={() => {
                  navigate({ to: "/play/multiplayer" });
                }}
                className="cursor-pointer group bg-neutral-800/50 backdrop-blur-xl text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-neutral-700/50 transition-all duration-500 flex items-center border border-white/10 hover:border-white/20"
              >
                <Users className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Multiplayer Mode</span>
              </button>

              {/* Replace the current Compete With AI button with this more prominent version */}
              <div className="fixed bottom-6 right-6 z-50">
                <div className="group relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 flex items-center justify-center mr-3 border border-white/10">
                    <Bot className="h-5 w-5 text-neutral-300" />
                  </div>

                  <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gradient-to-r from-purple-900/90 to-cyan-900/90 backdrop-blur-md rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Try AI Challenge
                    <div className="absolute top-full right-5 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-900/90"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: Users,
                  value: "7+",
                  label: "Elite Typists",
                  border: "border-neutral-700/50",
                },
                {
                  icon: Target,
                  value: "98%",
                  label: "Precision Rate",
                  border: "border-neutral-700/50",
                },
                {
                  icon: Trophy,
                  value: "125",
                  label: "Avg WPM",
                  border: "border-neutral-700/50",
                },
                {
                  icon: Star,
                  value: "4.1★",
                  label: "User Rating",
                  border: "border-neutral-700/50",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-neutral-900/50 backdrop-blur-xl rounded-lg p-5 text-center hover:bg-neutral-800/50 transition-all duration-300 border ${stat.border} group`}
                >
                  <stat.icon className="h-7 w-7 text-neutral-400 mx-auto mb-3 group-hover:text-white transition-colors duration-300" />
                  <div className="text-2xl font-light text-white mb-1 tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-500 font-light tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <section className="px-6 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-light text-white tracking-widest uppercase">
                New Feature
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Sparkles className="h-4 w-4 mr-2 text-neutral-300" />
                <span className="text-sm font-light tracking-wide text-neutral-300">
                  Intelligent Opponent
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-extralight text-white leading-tight">
                  Challenge Our
                </h2>
                <h2 className="text-5xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300">
                  Adaptive AI
                </h2>
              </div>

              <p className="text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
                Experience next-generation typing competition against an AI that learns from your patterns, adapts to your skill level, and helps accelerate your growth.
              </p>

              <div className="space-y-4">
                {[
                  "Dynamic difficulty adjustment",
                  "Personalized challenge generation",
                  "Real-time performance analysis",
                  "Predictive error prevention",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center text-neutral-300 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 mr-4"></div>
                    <span className="font-light tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={handlePlayBot}
                  className="group bg-white text-neutral-900 px-8 py-4 rounded-xl font-medium hover:bg-neutral-100 transition-all duration-300 flex items-center shadow-xl hover:shadow-white/20 hover:scale-105"
                >
                  <Bot className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">Try AI Challenge</span>
                </button>

                <button
                  onClick={handleWatchDemo}
                  className="group bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center border border-white/10 hover:border-white/30"
                >
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">Watch Demo</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium tracking-wide">
                          AI Opponent
                        </div>
                        <div className="text-sm text-neutral-400 font-light">
                          Adaptive Intelligence
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-white">98%</div>
                      <div className="text-xs text-neutral-400">Match Rate</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-sm text-neutral-400 font-light mb-2">
                        Current WPM
                      </div>
                      <div className="text-3xl font-light text-white mb-2">82</div>
                      <div className="text-xs text-emerald-400 font-light flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% this week
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-sm text-neutral-400 font-light mb-2">
                        AI Level
                      </div>
                      <div className="text-3xl font-light text-white mb-2">Pro</div>
                      <div className="text-xs text-neutral-400 font-light">
                        Matches your pace
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-sm text-neutral-400 font-light mb-4">
                      Performance Comparison
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: "Speed", value: 60 },
                        { name: "Accuracy", value: 70 },
                        { name: "Consistency", value: 80 },
                        { name: "Learning", value: 90 },
                      ].map((metric, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-300 font-light">
                              {metric.name}
                            </span>
                            <span className="text-white font-light">
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-neutral-100 to-neutral-300 rounded-full transition-all duration-1000"
                              style={{ width: `${metric.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                        <span className="text-sm text-white font-light">ES</span>
                      </div>
                      <div>
                        <div className="text-sm text-white font-light mb-1 leading-relaxed">
                          "The AI adapts perfectly to my level. Absolute game changer!"
                        </div>
                        <div className="text-xs text-neutral-400">— Early Tester</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-sm text-neutral-300 font-light">
                    <span className="text-white font-medium">127</span> users testing now
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h4 className="text-2xl font-light text-white mb-3 tracking-wide">
                  Ready to test your skills?
                </h4>
                <p className="text-neutral-300 font-light max-w-lg leading-relaxed">
                  Join <span className="text-white font-medium">127 active users</span> who have already challenged our AI this week and improved their typing speed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePlayBot}
                  className="px-8 py-4 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-all duration-300 flex items-center shadow-xl hover:shadow-white/20 hover:scale-105"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Start Free Challenge
                </button>
                <div className="px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                  <div className="text-xs text-neutral-400 mb-1">Limited Time</div>
                  <div className="text-sm text-white font-medium">Early Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
        <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -20px) rotate(-5deg); }
          75% { transform: translate(-10px, -10px) rotate(3deg); }
        }

        @keyframes elegantFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
      `}</style>
      </div>
      {/* <UpcomingFeature /> */}

      <section id="features" className="px-6 py-24 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center bg-white/5 rounded-full px-5 py-2 text-sm text-neutral-300 border border-white/10 mb-6">
              <Award className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="font-light tracking-wider">
                Premium Features
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
              Crafted for
              <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                Excellence
              </span>
            </h2>

            <p className="text-md sm:text-lg text-neutral-300 max-w-3xl mx-auto font-extralight leading-relaxed">
              Every detail is designed to sharpen speed, accuracy and
              competitive edge — smart analytics, curated challenges, and pro
              tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Precision Mastery",
                description:
                  "Real-time error detection and guided corrections that reduce mistakes and improve muscle memory.",
                accent: "from-blue-400/10 to-cyan-400/10",
                iconBg: "from-blue-400/20 to-cyan-400/20",
              },
              {
                icon: BarChart3,
                title: "Analytics Suite",
                description:
                  "Rich, actionable insights — speed trends, weakness heatmaps, and drill recommendations personalized to you.",
                accent: "from-emerald-400/10 to-teal-400/10",
                iconBg: "from-emerald-400/20 to-teal-400/20",
              },
              {
                icon: Zap,
                title: "Elite Challenges",
                description:
                  "Timed drills, tournaments and adaptive opponents that push you beyond plateaus and keep practice engaging.",
                accent: "from-amber-400/10 to-orange-400/10",
                iconBg: "from-amber-400/20 to-orange-400/20",
              },
            ].map((feature, i) => (
              <article
                key={i}
                aria-labelledby={`feature-${i}-title`}
                className={`group relative bg-gradient-to-br ${feature.accent} backdrop-blur-xl rounded-2xl p-6 md:p-8 transition-transform duration-500 hover:-translate-y-2 border border-white/5 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div
                  className={`inline-flex p-3 rounded-xl ${feature.iconBg} mb-4 items-center justify-center shadow-sm`}
                  aria-hidden="true"
                >
                  <feature.icon className="h-6 w-6 text-white/95" />
                </div>

                <h3
                  id={`feature-${i}-title`}
                  className="text-xl font-medium text-white mb-2"
                >
                  {feature.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <ul className="text-sm text-neutral-300 space-y-3 mt-2">
                  {/* concise bullets to add rhythm and scannability */}
                  <li className="flex items-start">
                    <span className="inline-flex mt-0.5 mr-3 text-emerald-400">
                      ●
                    </span>
                    <span>Instant feedback & correction hints</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex mt-0.5 mr-3 text-emerald-400">
                      ●
                    </span>
                    <span>Progress snapshots & exportable reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex mt-0.5 mr-3 text-emerald-400">
                      ●
                    </span>
                    <span>Lightweight UI optimized for speed</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center text-sm font-medium text-white/90 bg-white/5 hover:bg-white/8 px-3 py-2 rounded-lg border border-white/6 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingPlans />

      <section id="stats" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/10 via-neutral-700/5 to-neutral-800/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-white/[0.03] rounded-[2rem] p-16 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-white/[0.05] via-white/[0.02] to-transparent rounded-full top-0 left-0 blur-3xl"></div>
            <div className="absolute w-[300px] h-[300px] bg-gradient-radial from-white/[0.03] via-white/[0.01] to-transparent rounded-full bottom-0 right-0 blur-2xl"></div>

            <div className="relative z-10 text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
                Proven
                <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                  Results
                </span>
              </h2>

              <p className="text-xl text-neutral-300 font-extralight tracking-wide">
                Real achievements from our community of elite typists
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
              {[
                {
                  number: "87%",
                  label: "Achieved 50+ WPM improvement",
                  icon: TrendingUp,
                },
                { number: "94%", label: "Reached 98%+ accuracy", icon: Target },
                {
                  number: "82%",
                  label: "Mastered 100+ WPM in 60 days",
                  icon: Trophy,
                },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="mb-4">
                    <stat.icon className="h-8 w-8 text-white/60 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white mb-4 tracking-wider">
                    {stat.number}
                  </div>
                  <div className="text-neutral-300 text-lg font-extralight tracking-wide leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              Voices of
              <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                Success
              </span>
            </h2>

            <p className="text-xl text-neutral-300 font-extralight tracking-wide">
              Stories from our community of accomplished typists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Data Analyst",
                content:
                  "Transformed my workflow efficiency. From 45 WPM to 95 WPM in two months. The precision training is unmatched.",
                rating: 4,
                avatar: "SC",
              },
              {
                name: "Marcus Rodriguez",
                role: "Full-Stack Developer",
                content:
                  "As a developer, typing speed directly impacts productivity. This platform refined both my speed and coding accuracy.",
                rating: 5,
                avatar: "MR",
              },
              {
                name: "Elena Kowalski",
                role: "Technical Writer",
                content:
                  "The variety of practice texts and real-time analytics helped me achieve professional-grade typing skills effortlessly.",
                rating: 5,
                avatar: "EK",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-white/[0.03] backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition-all duration-700 border border-white/5 hover:border-white/10 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-5 w-5 text-amber-400/80 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-neutral-300 mb-8 leading-relaxed font-extralight tracking-wide text-lg">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center mr-4 text-white font-medium tracking-wider">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-light text-white tracking-wide text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-400 font-extralight tracking-wide">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.04] rounded-[2rem] p-16 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-white/[0.06] via-white/[0.02] to-transparent rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
                Ready to
                <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                  Excel?
                </span>
              </h2>

              <p className="text-xl text-neutral-300 mb-12 font-extralight tracking-wide leading-relaxed">
                Begin your journey to typing mastery today
              </p>

              <button
                onClick={() => navigate({ to: "/play/single" })}
                className="bg-gradient-to-r from-white via-neutral-50 to-white text-black px-16 py-5 rounded-2xl font-medium text-xl hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-white/10 relative overflow-hidden group tracking-wide"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <span className="relative z-10">Begin Your Training</span>
              </button>

              <p className="text-sm text-neutral-400 mt-6 font-extralight tracking-wider">
                Complimentary access • No commitment required
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <BottomFixedNav />
    </div>
  );
}

export default App;
