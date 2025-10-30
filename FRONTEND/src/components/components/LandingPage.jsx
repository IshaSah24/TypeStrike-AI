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
} from "lucide-react";
import logo from "./../../logo/logo.png";
import { useNavigate } from "@tanstack/react-router";
import zig from "./../../assets/TLP.png";
import UpcomingFeature from "./multiplayer/UpcomingFeature";
import battle from "../../assets/battle.svg";
import { fetchCurrentUser } from "../../features/auth/authSlice";
import MultiplayerBtn from "./multiplayer/MultiplayerBtn";
import LandingAuthBtns from "./Landing-auth-btns";
import CreateJoinRoomPage from "../../pages/CreateJoinRoomPage";

function App() {
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative overflow-hidden">
      {/* nav */}
      <div className="relative">
        {/* Main navbar */}
        <nav
          className={`fixed inset-x-0 top-4 z-50 mx-auto w-[95%] max-w-7xl lg:w-full rounded-full px-4 py-2 transition-all duration-300 ${
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
            <div className="inline-flex items-center space-x-1 group cursor-pointer">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-slate-500/10 to-slate-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-700 group-hover:from-slate-300/30 group-hover:via-slate-400/20"></div>

                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black rounded-xl backdrop-blur-sm border border-slate-700/30 group-hover:border-slate-500/50 transition-all duration-500 shadow-2xl"></div>

                <div className="w-full h-full flex items-center justify-center relative z-10 rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 via-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(148,163,184,0.15),transparent_50%)]"></div>

                  <div className="relative flex items-center justify-center">
                    <div className="relative">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 group-hover:from-white group-hover:via-slate-100 group-hover:to-slate-300 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(148,163,184,0.4)]">
                        T
                      </span>
                      <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                        <span className="text-2xl font-bold text-slate-300">
                          T
                        </span>
                      </div>

                      <div className="absolute -top-[1.8px] right-[-4px] w-2 h-2 bg-slate-400 rounded-full animate-ping opacity-95 group-hover:bg-slate-300"></div>
                      <div className="absolute -top-[1.8px] right-[-4px] opacity-[.5] w-[3px] h-[3px] bg-slate-300 rounded-full shadow-[0_0_8px_rgba(148,163,184,0.8)] group-hover:shadow-[0_0_12px_rgba(226,232,240,1)]"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-1 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-700"></div>
              </div>

              <div className="flex flex-col -space-y-1">
                <div className="flex items-baseline mb-[.4]">
                  <span className="text-md font-extralight text-slate-300 tracking-[0.1em] group-hover:tracking-[0.15em] transition-all duration-500">
                    Type
                  </span>
                  <span className="text-xl font-bold text-slate-100 tracking-[0.1em] group-hover:tracking-[0.15em] group-hover:text-white transition-all duration-500">
                    Strike
                  </span>
                  <span className="text-md font-light text-slate-400 tracking-wide group-hover:text-slate-300 transition-colors duration-500">
                    .Ai
                  </span>
                </div>
                <div className="h-[1.2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-all duration-500"></div>
              </div>
            </div>

            <LandingAuthBtns />
          </div>
        </nav>
        {/* Spacer */}
        <div className="h-20"></div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
        <section className="relative px-6 py-32 overflow-hidden">
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

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-flex mb-8 items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
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

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => {
                  navigate({ to: "/play/single" });
                }}
                className="group bg-gradient-to-r from-white via-neutral-50 to-white text-black px-10 py-4 rounded-xl font-medium text-lg hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 flex items-center shadow-2xl hover:shadow-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 tracking-wide">
                  Begin Training
                </span>
              </button>

              <button
                onClick={() => {
                  navigate({ to: "/play/multiplayer" });
                }}
                className="group bg-neutral-800/50 backdrop-blur-xl text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-neutral-700/50 transition-all duration-500 flex items-center border border-white/10 hover:border-white/20"
              >
                <Users className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Multiplayer Mode</span>
              </button>
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
      <UpcomingFeature />

      {/* Enhanced Features Section */}
      <section id="features" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/5  rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 mb-8">
              <Award className="h-4 w-4 mr-2" />
              <span className="font-light tracking-wider">
                Premium Features
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              Crafted for
              <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                Excellence
              </span>
            </h2>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
              Every detail designed to elevate your typing experience to
              professional standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Precision Mastery",
                description:
                  "Advanced error detection with intelligent correction guidance and real-time feedback systems",
                accent: "from-blue-400/10 to-cyan-400/10",
                iconBg: "from-blue-400/20 to-cyan-400/20",
              },
              {
                icon: BarChart3,
                title: "Analytics Suite",
                description:
                  "Comprehensive progress tracking with detailed insights into speed, accuracy, and improvement patterns",
                accent: "from-emerald-400/10 to-teal-400/10",
                iconBg: "from-emerald-400/20 to-teal-400/20",
              },
              {
                icon: Zap,
                title: "Elite Challenges",
                description:
                  "Curated speed challenges and competitive tournaments designed for serious improvement",
                accent: "from-amber-400/10 to-orange-400/10",
                iconBg: "from-amber-400/20 to-orange-400/20",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-gradient-to-br ${feature.accent} backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition-all duration-700 border border-white/5 hover:border-white/10 relative overflow-hidden`}
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.iconBg} mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <feature.icon className="h-7 w-7 text-white/90" />
                </div>

                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  {feature.title}
                </h3>

                <p className="text-neutral-300 leading-relaxed font-extralight tracking-wide">
                  {feature.description}
                </p>

                {/* Elegant bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section id="stats" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/10 via-neutral-700/5 to-neutral-800/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-white/[0.03] rounded-[2rem] p-16 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            {/* Inner ambient lighting */}
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

      {/* Refined Testimonials */}
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
                rating: 5,
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
                {/* Subtle hover glow */}
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

      {/* Premium CTA Section */}
      <section className="px-6 py-32 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.04] rounded-[2rem] p-16 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            {/* Inner lighting effects */}
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
                onClick={() => navigate({ to: "/single/play" })}
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

      {/* Refined Footer */}

      <footer className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4 space-y-6">
              <div className="inline-flex items-center space-x-4 group cursor-pointer">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse"></div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl backdrop-blur-sm border border-white/20 group-hover:border-cyan-400/50 transition-all duration-500"></div>

                  <div className="w-full h-full flex items-center justify-center relative z-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center justify-center">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-400 to-cyan-300 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500">
                        T
                      </span>
                      <div className="absolute -right-1 -top-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute -right-1 -top-1 w-2 h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-700"></div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="text-3xl font-extralight text-white tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-500">
                      Type
                    </span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-500">
                      Strike
                    </span>
                    <span className="text-xl font-light text-cyan-400/80 tracking-wider">
                      .Ai
                    </span>
                  </div>
                  <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-all duration-700 mt-1"></div>
                </div>
              </div>

              <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-sm tracking-wide">
                Elevating your typing experience with precision, speed, and
                elegance. Master your craft with every keystroke.
              </p>
            </div>

            <div className="md:col-span-2 space-y-5">
              <h3 className="text-white font-light text-sm tracking-[0.2em] uppercase mb-6">
                Product
              </h3>
              <nav className="flex flex-col space-y-4">
                {["Features", "Pricing", "Updates", "Beta"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-neutral-400 hover:text-white font-light text-sm tracking-wide transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-2 space-y-5">
              <h3 className="text-white font-light text-sm tracking-[0.2em] uppercase mb-6">
                Company
              </h3>
              <nav className="flex flex-col space-y-4">
                {["About", "Careers", "Blog", "Press"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-neutral-400 hover:text-white font-light text-sm tracking-wide transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h3 className="text-white font-light text-sm tracking-[0.2em] uppercase mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@speedstrike.com"
                  className="flex items-start space-x-3 text-neutral-400 hover:text-white transition-colors duration-300 group"
                >
                  <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-light text-sm tracking-wide">
                    hello@speedstrike.com
                  </span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-start space-x-3 text-neutral-400 hover:text-white transition-colors duration-300 group"
                >
                  <Phone className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-light text-sm tracking-wide">
                    +1 (234) 567-890
                  </span>
                </a>
                <div className="flex items-start space-x-3 text-neutral-400">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span className="font-light text-sm tracking-wide leading-relaxed">
                    123 Speed Lane
                    <br />
                    San Francisco, CA 94102
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-500 font-light text-sm tracking-wider">
                © 2025 SpeedStrike. All rights reserved.
              </p>
              <div className="flex items-center space-x-8">
                <a
                  href="#"
                  className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </footer>
    </div>
  );
}

export default App;
