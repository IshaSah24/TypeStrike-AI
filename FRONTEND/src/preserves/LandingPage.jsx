import React from "react";
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
} from "lucide-react";
import logo from "./../../logo/logo.png";
import { useNavigate } from "@tanstack/react-router";
import zig from "./../../assets/TLP.png";

function App() {
  const navigate = useNavigate();
  const floatingLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black relative overflow-hidden">
      {/* Sophisticated ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-neutral-950/80 to-black/90"></div>
      
      {/* Premium lighting system */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-radial from-white/[0.03] via-white/[0.01] to-transparent rounded-full -top-96 -left-96 blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-neutral-300/[0.02] via-neutral-400/[0.008] to-transparent rounded-full top-1/3 right-0 blur-3xl"></div>
      <div className="absolute w-[700px] h-[700px] bg-gradient-radial from-neutral-200/[0.015] via-neutral-300/[0.005] to-transparent rounded-full -bottom-96 left-1/2 transform -translate-x-1/2 blur-3xl"></div>

      {/* Top Navigation */}
      <nav className="z-20 relative px-6 py-4 backdrop-blur-xl bg-neutral-900/20 border-b border-neutral-800/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/10"></div>
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain relative z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-light text-white tracking-wider">TypeSpeed</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-neutral-300 hover:text-white transition-all duration-300 font-light tracking-wide hover:tracking-wider"
            >
              Features
            </a>
            <a
              href="#stats"
              className="text-neutral-300 hover:text-white transition-all duration-300 font-light tracking-wide hover:tracking-wider"
            >
              Statistics
            </a>
            <a
              href="#testimonials"
              className="text-neutral-300 hover:text-white transition-all duration-300 font-light tracking-wide hover:tracking-wider"
            >
              Reviews
            </a>
            <button
              onClick={() => navigate({ to: "/typing" })}
              className="bg-gradient-to-r from-white via-neutral-50 to-white text-black px-8 py-3 rounded-xl font-medium hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 shadow-2xl hover:shadow-white/10 relative overflow-hidden group tracking-wide"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <span className="relative z-10">Start Typing</span>
            </button>
          </div>
        </div>
      </nav>

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
                  filter: 'blur(0.5px)',
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
                animation: `elegantFloat ${20 + Math.random() * 15}s infinite linear`,
                animationDelay: `${Math.random() * 15}s`,
                boxShadow: '0 0 4px currentColor',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Premium badge */}
          <div className="inline-flex mb-8 items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
            <Sparkles className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-light tracking-wider">Master Your Typing Craft</span>
          </div>

          <div className="mb-12 relative">
            <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 leading-tight tracking-wide">
              Type Like a{" "}
              <span className="relative font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                Virtuoso
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-2xl"></div>
              </span>
            </h1>

            {/* Elegant accent image */}
            <div className="absolute top-4 right-8 md:right-24 opacity-60">
              <img 
                className="w-24 md:w-32 filter brightness-75 hover:brightness-100 transition-all duration-500" 
                src={zig} 
                alt="Accent" 
              />
            </div>

            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed font-extralight tracking-wide">
              Elevate your typing prowess with our sophisticated training platform. 
              Experience precision, speed, and elegance in every keystroke.
            </p>
          </div>

          {/* Premium action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate({ to: "/typing" })}
              className="group bg-gradient-to-r from-white via-neutral-50 to-white text-black px-10 py-4 rounded-xl font-medium text-lg hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 flex items-center shadow-2xl hover:shadow-white/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10 tracking-wide">Begin Training</span>
            </button>
            
            <button className="bg-white/5 backdrop-blur-xl text-white px-10 py-4 rounded-xl font-light text-lg hover:bg-white/10 transition-all duration-500 flex items-center border border-white/10 hover:border-white/20 group">
              <span className="tracking-wide">Watch Demo</span>
              <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Refined stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "50K+", label: "Elite Typists", gradient: "from-blue-400/20 to-cyan-400/20" },
              { icon: Target, value: "98%", label: "Precision Rate", gradient: "from-emerald-400/20 to-teal-400/20" },
              { icon: Trophy, value: "125", label: "Avg WPM", gradient: "from-amber-400/20 to-orange-400/20" },
              { icon: Star, value: "4.9★", label: "User Rating", gradient: "from-purple-400/20 to-pink-400/20" },
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

      {/* Enhanced Features Section */}
      <section id="features" className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 text-sm text-neutral-300 border border-white/10 mb-8">
              <Award className="h-4 w-4 mr-2" />
              <span className="font-light tracking-wider">Premium Features</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              Crafted for
              <span className="block font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white">
                Excellence
              </span>
            </h2>
            
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
              Every detail designed to elevate your typing experience to professional standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Precision Mastery",
                description: "Advanced error detection with intelligent correction guidance and real-time feedback systems",
                accent: "from-blue-400/10 to-cyan-400/10",
                iconBg: "from-blue-400/20 to-cyan-400/20",
              },
              {
                icon: BarChart3,
                title: "Analytics Suite",
                description: "Comprehensive progress tracking with detailed insights into speed, accuracy, and improvement patterns",
                accent: "from-emerald-400/10 to-teal-400/10",
                iconBg: "from-emerald-400/20 to-teal-400/20",
              },
              {
                icon: Zap,
                title: "Elite Challenges",
                description: "Curated speed challenges and competitive tournaments designed for serious improvement",
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
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.iconBg} mb-6 group-hover:scale-110 transition-transform duration-500`}>
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
                { number: "87%", label: "Achieved 50+ WPM improvement", icon: TrendingUp },
                { number: "94%", label: "Reached 98%+ accuracy", icon: Target },
                { number: "82%", label: "Mastered 100+ WPM in 60 days", icon: Trophy },
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
                content: "Transformed my workflow efficiency. From 45 WPM to 95 WPM in two months. The precision training is unmatched.",
                rating: 5,
                avatar: "SC",
              },
              {
                name: "Marcus Rodriguez",
                role: "Full-Stack Developer",
                content: "As a developer, typing speed directly impacts productivity. This platform refined both my speed and coding accuracy.",
                rating: 5,
                avatar: "MR",
              },
              {
                name: "Elena Kowalski",
                role: "Technical Writer",
                content: "The variety of practice texts and real-time analytics helped me achieve professional-grade typing skills effortlessly.",
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
                      <div className="font-light text-white tracking-wide text-lg">{testimonial.name}</div>
                      <div className="text-sm text-neutral-400 font-extralight tracking-wide">{testimonial.role}</div>
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
                onClick={() => navigate({ to: "/typing" })}
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
      <footer className="px-6 py-16 bg-neutral-900/50 backdrop-blur-xl border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/10"></div>
                <img className="w-full h-full object-contain relative z-10" src={logo} alt="Logo" />
              </div>
              <span className="text-2xl font-light text-white tracking-wider">TypeSpeed</span>
            </div>
            
            <div className="flex space-x-8 text-neutral-300 font-extralight tracking-wide">
              <a href="#" className="hover:text-white transition-all duration-300 hover:tracking-wider">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 hover:tracking-wider">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 hover:tracking-wider">
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
      </footer>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
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
            opacity: 0.10;
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



// --------------------------------------------------------------

// import React from "react";
// import {
//   Keyboard,
//   Zap,
//   Target,
//   Trophy,
//   Users,
//   Clock,
//   TrendingUp,
//   Star,
//   ChevronRight,
//   Play,
// } from "lucide-react";
// import logo from "./../../logo/logo.png";
// import { useNavigate } from "@tanstack/react-router";
// import zig from "./../../assets/TLP.png";

// function App() {
//   const navigate = useNavigate();
//   // Letters for floating animation
//   const floatingLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-[#0d050f] to-slate-900">
//       {/* Top Navigation */}
//       <nav className="z-10 relative px-6 py-4 h-[60px] relative overflow-visible">
//         <div className="max-w-7xl h-[7rem] mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div
//               style={{ width: "100px", height: "100px", overflow: "hidden" }}
//             >
//               <img
//                 src={logo}
//                 alt="Logo"
//                 style={{
//                   height: "120px" /* Fixed height */,
//                   width: "auto" /* Keep aspect ratio */,
//                   objectFit: "contain" /* Prevent cropping */,
//                   display: "block",
//                   position: "absolute",
//                   top: "94%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </div>

//           <div className="hidden md:flex items-center pb-16  space-x-8">
//             <a
//               href="#features"
//               className="text-gray-300 hover:text-white transition-colors"
//             >
//               Features
//             </a>
//             <a
//               href="#stats"
//               className="text-gray-300 hover:text-white transition-colors"
//             >
//               Stats
//             </a>
//             <a
//               href="#testimonials"
//               className="text-gray-300 hover:text-white transition-colors"
//             >
//               Reviews
//             </a>
//             <button
//               onClick={() => navigate({ to: "/typing" })}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
//             >
//               Start Typing
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Hero Section */}
//       <section className="relative px-6 py-20 overflow-hidden">
//         {/* Animated background elements */}
//         {/* Background letters animation – fun but CPU heavy, optimize later maybe */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {floatingLetters.length > 0 &&
//             floatingLetters.map((letter, i) => {
//               const size = 14 + Math.random() * 12;
//               const leftPos = Math.random() * 100;
//               const topPos = Math.random() * 100;
//               const animIndex = i % 6;
//               const animGlowIndex = i % 3;
//               const animDuration = 8 + Math.random() * 4;
//               const glowDuration = 4 + Math.random() * 2;
//               const animDelay = Math.random() * 6;
//               const glowDelay = Math.random() * 4;
//               const hue = 260 + Math.random() * 60;

//               return (
//                 <div
//                   key={i}
//                   className="absolute font-medium   select-none letter-subtle"
//                   style={{
//                     fontSize: `${size}px`,
//                     left: `${leftPos}%`,
//                     top: `${topPos}%`,
//                     animation: `
//                     letterFloat-${animIndex} ${animDuration}s infinite ease-in-out,
//                     letterGlow-${animGlowIndex} ${glowDuration}s infinite ease-in-out
//                   `,
//                     animationDelay: `${animDelay}s, ${glowDelay}s`,
//                     color: `hsl(${hue}, 50%, 45%)`,
//                     opacity: 0.15,
//                   }}
//                 >
//                   {letter}
//                 </div>
//               );
//             })}

//           {/* Floating particles */}
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={`particle-${i}`}
//               className="absolute w-1.5 h-1.5   rounded-full particle-subtle"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animation: `
//                   particleFloat ${12 + Math.random() * 8}s infinite linear,
//                   particleGlow ${3 + Math.random() * 2}s infinite ease-in-out
//                 `,
//                 animationDelay: `${Math.random() * 10}s, ${Math.random() * 3}s`,
//                 background: `hsl(${280 + Math.random() * 40}, 60%, 60%)`,
//                 opacity: 0.15,
//               }}
//             />
//           ))}
//         </div>

//         <div className="absolute  inset-0 bg-gradient-to-r from-purple-800/10  to-pink-800/10"></div>

//         <div className=" h-[54rem] relative z-10 max-w-7xl mx-auto text-center flex flex-col justify-center items-center pb-12 px-4 sm:px-6 lg:px-8">
//           <div className="inline-flex mb-6 items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-purple-200 mb-6">
//             <Zap className="h-4 w-4 mr-2" />
//             Master Your Typing Speed
//           </div>
//           <div className="mb-8 ">
//             <h1 style={{ fontFamily: 'Randelles', fontSize: '7rem'}} className="tracking-wide text-5xl md:text-7xl font-bold text-white mb-6  leading-tight">
//               Type Like a{" "}
//               <span style={{fontWeight : 'bold'}} className=" relative p-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
//                 Pro
//               </span>
//             <img className="w-132 absolute top-10 right-26" src={zig} alt="" />
//             </h1>

//             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
//               Improve your typing speed and accuracy with our interactive typing
//               game. Practice with real-world texts and track your progress.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row  gap-4 justify-center items-center mb-12">
//             <button
//               onClick={() => navigate({ to: "/typing" })}
//               className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center"
//             >
//               <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
//               Start Typing Now
//             </button>
//             <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-500 flex items-center">
//               View Demo <ChevronRight className="h-5 w-5 ml-2" />
//             </button>
//           </div>

//           {/* Stats Preview Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4  gap-6 max-w-3xl mx-auto">
//             {[
//               { icon: Users, value: "50K+", label: "Active Users" },
//               // { icon: Clock, value: "1M+", label: "Hours Practiced" },
//               { icon: Target, value: "95%", label: "Accuracy Rate" },
//               { icon: Trophy, value: "120", label: "Avg WPM" },
//               { icon: Star, value: "4.8★", label: "Average Rating" },
//             ].map((stat, i) => (
//               <div
//                 key={i}
//                 className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
//               >
//                 <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
//                 <div className="text-2xl font-bold text-white mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm  text-gray-300">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Why us? */}
//       <section id="features" className="px-6 py-20 bg-slate-900/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Why Choose TypeSpeed?
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Features to make you a faster, more accurate typist
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Target,
//                 title: "Precision Training",
//                 description:
//                   "Real-time  error detection and correction guidance",
//                 gradient: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: TrendingUp,
//                 title: "Progress Tracking",
//                 description: "Monitor WPM, accuracy, and improvement over time",
//                 gradient: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: Zap,
//                 title: "Speed Challenges",
//                 description: "Timed challenges  and competitive leaderboards",
//                 gradient: "from-orange-500 to-red-500",
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105"
//               >
//                 <div
//                   className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}
//                 >
//                   <feature.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section id="stats" className="px-6 py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-3xl p-12 backdrop-blur-sm">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-white mb-4">
//                 Join Thousands of Successful Typists
//               </h2>
//               <p className="text-xl text-gray-300">
//                 Real results from our users
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8 text-center">
//               {[
//                 { number: "87%", label: "Improved by 40+ WPM" },
//                 { number: "92%", label: "Achieved 95%+ accuracy" },
//                 { number: "78%", label: "Reached 80+ WPM in 30 days" },
//               ].map((stat, i) => (
//                 <div key={i}>
//                   <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-300 text-lg">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="px-6 py-20 bg-slate-900/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               What Users Say
//             </h2>
//             <p className="text-xl text-gray-300">
//               Success stories from our community
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Data Analyst",
//                 content:
//                   "Increased my typing from 45 to 85 WPM in just 6 weeks. The progress tracking keeps me motivated!",
//                 rating: 5,
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Developer",
//                 content:
//                   "As a programmer, fast typing is crucial. This made me not just faster, but more precise too.",
//                 rating: 5,
//               },
//               {
//                 name: "Emily Rodriguez",
//                 role: "Content Writer",
//                 content:
//                   "The variety of texts keeps practice engaging. I've never enjoyed improving a skill this much!",
//                 rating: 5,
//               },
//             ].map((t, i) => (
//               <div
//                 key={i}
//                 className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
//               >
//                 <div className="flex mb-4">
//                   {[...Array(t.rating)].map((_, starIndex) => (
//                     <Star
//                       key={starIndex}
//                       className="h-5 w-5 text-yellow-400 fill-current"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-300 mb-6 leading-relaxed">
//                   "{t.content}"
//                 </p>
//                 <div>
//                   <div className="font-semibold text-white">{t.name}</div>
//                   <div className="text-sm text-gray-400">{t.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-3xl p-12 backdrop-blur-sm">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Ready to Type Like a Pro?
//             </h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Start today and see immediate improvements
//             </p>
//             <button
//               onClick={() => navigate({ to: "/typing" })}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
//             >
//               Begin Your Training
//             </button>
//             <p className="text-sm text-gray-400 mt-4">
//               Free to start • No credit card needed
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-6 py-12 bg-slate-900/80 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center space-x-2 mb-4 md:mb-0">
//               {/* <Keyboard className="h-8 w-8 text-purple-400" /> */}
//               <img className="w-8" src={logo} alt="" />
//               <span className="text-2xl font-bold text-white">TypeSpeed</span>
//             </div>
//             <div className="flex space-x-8 text-gray-300">
//               <a href="#" className="hover:text-white transition-colors">
//                 Privacy
//               </a>
//               <a href="#" className="hover:text-white transition-colors">
//                 Terms
//               </a>
//               <a href="#" className="hover:text-white transition-colors">
//                 Support
//               </a>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 TypeSpeed. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Animation styles */}
//       <style jsx>{`
//         .letter-subtle {
//           text-shadow: 0 0 30px currentColor;
//           transition: all 0.5s ease;
//           filter: blur(0.5px);
//         }

//         .particle-subtle {
//           box-shadow: 0 0 2px currentColor;
//         }

//         /* Floating animations */
//         @keyframes letterFloat-0 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           25% {
//             transform: translateY(-20px) translateX(10px) scale(1.05);
//           }
//           50% {
//             transform: translateY(-35px) translateX(0) scale(0.95);
//           }
//           75% {
//             transform: translateY(-20px) translateX(-10px) scale(1.02);
//           }
//         }

//         @keyframes letterFloat-1 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           33% {
//             transform: translateY(25px) translateX(-15px) scale(1.08);
//           }
//           66% {
//             transform: translateY(15px) translateX(15px) scale(0.92);
//           }
//         }

//         @keyframes letterFloat-2 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           20% {
//             transform: translateY(-15px) translateX(20px) scale(1.03);
//           }
//           40% {
//             transform: translateY(-30px) translateX(-5px) scale(1.1);
//           }
//           60% {
//             transform: translateY(-15px) translateX(-20px) scale(0.9);
//           }
//           80% {
//             transform: translateY(5px) translateX(5px) scale(1.05);
//           }
//         }

//         @keyframes letterFloat-3 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           50% {
//             transform: translateY(-40px) translateX(12px) scale(1.12);
//           }
//         }

//         @keyframes letterFloat-4 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           25% {
//             transform: translateY(22px) translateX(-12px) scale(0.88);
//           }
//           75% {
//             transform: translateY(-22px) translateX(12px) scale(1.15);
//           }
//         }

//         @keyframes letterFloat-5 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0) scale(1);
//           }
//           16% {
//             transform: translateY(-10px) translateX(18px) scale(1.04);
//           }
//           32% {
//             transform: translateY(-20px) translateX(8px) scale(1.12);
//           }
//           48% {
//             transform: translateY(-30px) translateX(-8px) scale(0.94);
//           }
//           64% {
//             transform: translateY(-20px) translateX(-18px) scale(1.08);
//           }
//           80% {
//             transform: translateY(-10px) translateX(-8px) scale(0.96);
//           }
//         }

//         /* Glow effects */
//         @keyframes letterGlow-0 {
//           0%,
//           100% {
//             opacity: 0.15; // Reduced from 0.4
//             text-shadow: 0 0 2px currentColor; // Reduced glow
//           }
//           50% {
//             opacity: 0.3; // Reduced from 0.8
//             text-shadow: 0 0 4px currentColor; // Reduced glow
//           }
//         }

//         @keyframes letterGlow-1 {
//           0%,
//           100% {
//             opacity: 0.3;
//             filter: blur(0.5px);
//             text-shadow: 0 0 8px currentColor, 0 0 12px currentColor;
//           }
//           33% {
//             opacity: 0.65;
//             filter: blur(1.2px);
//             text-shadow: 0 0 14px currentColor, 0 0 22px currentColor;
//           }
//           66% {
//             opacity: 0.5;
//             filter: blur(0.9px);
//             text-shadow: 0 0 10px currentColor, 0 0 18px currentColor;
//           }
//         }

//         @keyframes letterGlow-2 {
//           0%,
//           100% {
//             opacity: 0.35;
//             filter: blur(0.6px);
//           }
//           25% {
//             opacity: 0.75;
//             filter: blur(1.1px);
//           }
//           75% {
//             opacity: 0.5;
//             filter: blur(0.8px);
//           }
//         }

//         /* Particle animations */
//         @keyframes particleFloat {
//           0% {
//             transform: translateY(100vh) translateX(0);
//             opacity: 0;
//           }
//           10% {
//             opacity: 0.3;
//           }
//           90% {
//             opacity: 0.3;
//           }
//           100% {
//             transform: translateY(-100vh) translateX(30px);
//             opacity: 0;
//           }
//         }

//         @keyframes particleGlow {
//           0%,
//           100% {
//             box-shadow: 0 0 1px currentColor;
//           }
//           50% {
//             box-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;
