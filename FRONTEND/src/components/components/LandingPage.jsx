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

  const floatingLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative overflow-hidden">
      {/* Sophisticated ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-neutral-950/80 to-black/90"></div>

      {/* Premium lighting system */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-radial from-white/[0.03] via-white/[0.01] to-transparent rounded-full -top-96 -left-96 blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-neutral-300/[0.02] via-neutral-400/[0.008] to-transparent rounded-full top-1/3 right-0 blur-3xl"></div>
      <div className="absolute w-[700px] h-[700px] bg-gradient-radial from-neutral-200/[0.015] via-neutral-300/[0.005] to-transparent rounded-full -bottom-96 left-1/2 transform -translate-x-1/2 blur-3xl"></div>

      {/* Top Navigation */}
      <div className="relative">
        {/* Main navbar */}
        <nav
          className={`fixed inset-x-0 top-4 z-50 mx-auto w-[95%] max-w-7xl lg:w-full rounded-full px-4 py-2  transition-all duration-300 ${
            scrolled
              ? "bg-white/30 dark:bg-neutral-900/40 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Background with masking effect */}
          <div
            className="absolute inset-0 rounded-full bg-white/10 dark:bg-neutral-900/40 backdrop-blur-xl shadow-md transition-all duration-300"
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

          {/* Content */}
          <div className="flex items-center justify-between relative z-10 py-[1px] px-2">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
                        <div className="bg-[var(--color-bg)] text-[var(--color-text)] rounded">
                          <Zap className=" bg-[var(--color-bg)]  text-[var(--color-text)]  w-6 h-6  rotate-44" />
                        </div>
              </div>
              <span className="text-black dark:text-white text-sm font-medium">
                Strike
              </span>
            </div>

            {/* Right Section */}
            <LandingAuthBtns />
          </div>
        </nav>
        {/* Spacer */}
        <div className="h-20"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative px-6 py-32 overflow-hidden">
        {/* Refined floating elements */}
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

          {/* Elegant floating particles */}
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Premium badge */}
          <div className="inline-flex mb-8 items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
            <Sparkles className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-light tracking-wider">
              Master Your Typing Craft
            </span>
          </div>

          <div className="mb-12 relative">
            <h1 className=" text-6xl md:text-8xl font-medium text-white mb-8 leading-tight tracking-none">
              Type Like a{"  "}
              <span
                style={{ fontFamily: "Randelles", fontSize: "7rem" }}
                className="relative font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white"
              >
                Virtuoso
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-2xl"></div>
              </span>
            </h1>
            <p className="text-xl md:text-sm text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed font-extralight tracking-wide">
              Elevate your typing prowess with our sophisticated training
              platform. Experience precision, speed, and elegance in every
              keystroke.
            </p>
          </div>

          {/* Premium action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate({ to: "/play/single" })}
              className="group bg-gradient-to-r from-white via-neutral-50 to-white text-black px-10 py-4 rounded-xl font-medium text-lg hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 flex items-center shadow-2xl hover:shadow-white/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10 tracking-wide">
                Begin Training
              </span>
            </button>

          <MultiplayerBtn />


          </div>
          {/* Refined stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                value: "50K+",
                label: "Elite Typists",
                gradient: "from-blue-400/20 to-cyan-400/20",
              },
              {
                icon: Target,
                value: "98%",
                label: "Precision Rate",
                gradient: "from-emerald-400/20 to-teal-400/20",
              },
              {
                icon: Trophy,
                value: "125",
                label: "Avg WPM",
                gradient: "from-amber-400/20 to-orange-400/20",
              },
              {
                icon: Star,
                value: "4.9★",
                label: "User Rating",
                gradient: "from-purple-400/20 to-pink-400/20",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-xl rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500 border border-white/5 hover:border-white/10 group`}
              >
                <stat.icon className="h-8 w-8 text-white/80 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-light text-white mb-2 tracking-wide">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-300 font-extralight tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UpcomingFeature />

      {/* Enhanced Features Section */}
      <section id="features" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 mb-8">
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
      <footer className=" h-[36rem] px-6 py-16 bg-neutral-900/50 backdrop-blur-xl border-t border-white/5 relative">
        <div className="  max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/10"></div>
                <img
                  className="w-full h-full object-contain relative z-10"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <span className="text-2xl font-light text-white tracking-wider">
                SpeedStrike
              </span>
            </div>

            <div className="flex space-x-8 text-neutral-300 font-extralight tracking-wide">
              <a
                href="#"
                className="hover:text-white transition-all duration-300 hover:tracking-wider"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white transition-all duration-300 hover:tracking-wider"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-white transition-all duration-300 hover:tracking-wider"
              >
                Support
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 text-center">
            <p className="text-neutral-400 font-extralight tracking-wider">
              &copy; 2025 TypeSpeed. Crafted with precision.
            </p>
          </div>
        </div>

        <div className=" relative w-full text-center text-9xl text-white mt-32 opacity-[.03]">
          SpeedStrike
        </div>
        {/* <div className=" absolute top-[55%] right-[48%] h-52 w-[68rem] bg-red-300"></div> */}
      </footer>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.08;
          }
          25% {
            transform: translateY(-15px) translateX(8px) rotate(2deg);
            opacity: 0.12;
          }
          50% {
            transform: translateY(-25px) translateX(0) rotate(-1deg);
            opacity: 0.06;
          }
          75% {
            transform: translateY(-15px) translateX(-8px) rotate(1deg);
            opacity: 0.1;
          }
        }

        @keyframes elegantFloat {
          0% {
            transform: translateY(100vh) translateX(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
            transform: scale(1);
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) scale(0.8);
            opacity: 0;
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}

export default App;
