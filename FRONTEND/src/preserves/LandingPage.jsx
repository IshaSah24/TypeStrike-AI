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
      {/* Sophisticated ambient background */}
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
                <span className="relative font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                  Virtuoso
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-2xl"></div>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed font-extralight tracking-wide">
                Elevate your typing prowess with our sophisticated training
                platform. Experience precision, speed, and elegance in every
                keystroke.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button onClick={(e)=>{
                navigate({ to: "/SinglePlayerHome" })
              
              }} className="group bg-gradient-to-r from-white via-neutral-50 to-white text-black px-10 py-4 rounded-xl font-medium text-lg hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 flex items-center shadow-2xl hover:shadow-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 tracking-wide">
                  Begin Training
                </span>
              </button>

              <button className="group bg-neutral-800/50 backdrop-blur-xl text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-neutral-700/50 transition-all duration-500 flex items-center border border-white/10 hover:border-white/20">
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
    </div>
  );
}

export default App;
