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
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";


function App() {
  const navigate = useNavigate();
  // Letters for floating animation
  const floatingLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-[#0d050f] to-slate-900">
      {/* Top Navigation */}
      <nav className="z-10 relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Keyboard className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">TypeSpeed</span>
          </div>

          <div className="hidden md:flex items-center   space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#stats"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Stats
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <button   onClick={() => navigate({ to: "/typing" })} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Start Typing
            </button>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        {/* Animated background elements */}
        {/* Background letters animation – fun but CPU heavy, optimize later maybe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingLetters.length > 0 &&
            floatingLetters.map((letter, i) => {
              const size = 14 + Math.random() * 12;
              const leftPos = Math.random() * 100;
              const topPos = Math.random() * 100;
              const animIndex = i % 6;
              const animGlowIndex = i % 3;
              const animDuration = 8 + Math.random() * 4;
              const glowDuration = 4 + Math.random() * 2;
              const animDelay = Math.random() * 6;
              const glowDelay = Math.random() * 4;
              const hue = 260 + Math.random() * 60;

              return (
                <div
                  key={i}
                  className="absolute font-medium   select-none letter-subtle"
                  style={{
                    fontSize: `${size}px`,
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                    animation: `
                    letterFloat-${animIndex} ${animDuration}s infinite ease-in-out,
                    letterGlow-${animGlowIndex} ${glowDuration}s infinite ease-in-out
                  `,
                    animationDelay: `${animDelay}s, ${glowDelay}s`,
                    color: `hsl(${hue}, 50%, 45%)`,
                    opacity: 0.4,
                  }}
                >
                  {letter}
                </div>
              );
            })}

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5   rounded-full particle-subtle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `
                  particleFloat ${12 + Math.random() * 8}s infinite linear,
                  particleGlow ${3 + Math.random() * 2}s infinite ease-in-out
                `,
                animationDelay: `${Math.random() * 10}s, ${Math.random() * 3}s`,
                background: `hsl(${280 + Math.random() * 40}, 60%, 60%)`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="absolute  inset-0 bg-gradient-to-r from-purple-800/10  to-pink-800/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-purple-200 mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Master Your Typing Speed
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6  leading-tight">
              Type Like a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Pro
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Improve your typing speed and accuracy with our interactive typing
              game. Practice with real-world texts and track your progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row  gap-4 justify-center items-center mb-12">
            <button   onClick={() => navigate({ to: "/typing" })} className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center">
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Typing Now
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center">
              View Demo <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>

          {/* Stats Preview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4  gap-6 max-w-3xl mx-auto">
            {[
              { icon: Users, value: "50K+", label: "Active Users" },
              // { icon: Clock, value: "1M+", label: "Hours Practiced" },
              { icon: Target, value: "95%", label: "Accuracy Rate" },
              { icon: Trophy, value: "120", label: "Avg WPM" },
              { icon: Star, value: "4.8★", label: "Average Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm  text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Why us? */}
      <section id="features" className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose TypeSpeed?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Features to make you a faster, more accurate typist
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Precision Training",
                description:
                  "Real-time  error detection and correction guidance",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Monitor WPM, accuracy, and improvement over time",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "Speed Challenges",
                description: "Timed challenges  and competitive leaderboards",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-3xl p-12 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Join Thousands of Successful Typists
              </h2>
              <p className="text-xl text-gray-300">
                Real results from our users
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: "87%", label: "Improved by 40+ WPM" },
                { number: "92%", label: "Achieved 95%+ accuracy" },
                { number: "78%", label: "Reached 80+ WPM in 30 days" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-gray-300">
              Success stories from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Data Analyst",
                content:
                  "Increased my typing from 45 to 85 WPM in just 6 weeks. The progress tracking keeps me motivated!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Developer",
                content:
                  "As a programmer, fast typing is crucial. This made me not just faster, but more precise too.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Content Writer",
                content:
                  "The variety of texts keeps practice engaging. I've never enjoyed improving a skill this much!",
                rating: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{t.content}"
                </p>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Type Like a Pro?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start today and see immediate improvements
            </p>
            <button   onClick={() => navigate({ to: "/typing" })} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              Begin Your Training
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Free to start • No credit card needed
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Keyboard className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">TypeSpeed</span>
            </div>
            <div className="flex space-x-8 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TypeSpeed. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Animation styles */}
      <style jsx>{`
        .letter-subtle {
          text-shadow: 0 0 30px currentColor;
          transition: all 0.4s ease;
          filter: blur(0.5px);
        }

        .particle-subtle {
          box-shadow: 0 0 2px currentColor;
        }

        /* Floating animations */
        @keyframes letterFloat-0 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          50% {
            transform: translateY(-35px) translateX(0) scale(0.95);
          }
          75% {
            transform: translateY(-20px) translateX(-10px) scale(1.02);
          }
        }

        @keyframes letterFloat-1 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          33% {
            transform: translateY(25px) translateX(-15px) scale(1.08);
          }
          66% {
            transform: translateY(15px) translateX(15px) scale(0.92);
          }
        }

        @keyframes letterFloat-2 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          20% {
            transform: translateY(-15px) translateX(20px) scale(1.03);
          }
          40% {
            transform: translateY(-30px) translateX(-5px) scale(1.1);
          }
          60% {
            transform: translateY(-15px) translateX(-20px) scale(0.9);
          }
          80% {
            transform: translateY(5px) translateX(5px) scale(1.05);
          }
        }

        @keyframes letterFloat-3 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(12px) scale(1.12);
          }
        }

        @keyframes letterFloat-4 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(22px) translateX(-12px) scale(0.88);
          }
          75% {
            transform: translateY(-22px) translateX(12px) scale(1.15);
          }
        }

        @keyframes letterFloat-5 {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          16% {
            transform: translateY(-10px) translateX(18px) scale(1.04);
          }
          32% {
            transform: translateY(-20px) translateX(8px) scale(1.12);
          }
          48% {
            transform: translateY(-30px) translateX(-8px) scale(0.94);
          }
          64% {
            transform: translateY(-20px) translateX(-18px) scale(1.08);
          }
          80% {
            transform: translateY(-10px) translateX(-8px) scale(0.96);
          }
        }

        /* Glow effects */
        @keyframes letterGlow-0 {
          0%,
          100% {
            opacity: 0.4;
            text-shadow: 0 0 6px currentColor, 0 0 12px currentColor,
              0 0 20px currentColor;
          }
          50% {
            opacity: 0.8;
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor,
              0 0 30px currentColor;
          }
        }

        @keyframes letterGlow-1 {
          0%,
          100% {
            opacity: 0.3;
            filter: blur(0.5px);
            text-shadow: 0 0 8px currentColor, 0 0 12px currentColor;
          }
          33% {
            opacity: 0.65;
            filter: blur(1.2px);
            text-shadow: 0 0 14px currentColor, 0 0 22px currentColor;
          }
          66% {
            opacity: 0.5;
            filter: blur(0.9px);
            text-shadow: 0 0 10px currentColor, 0 0 18px currentColor;
          }
        }

        @keyframes letterGlow-2 {
          0%,
          100% {
            opacity: 0.35;
            filter: blur(0.6px);
          }
          25% {
            opacity: 0.75;
            filter: blur(1.1px);
          }
          75% {
            opacity: 0.5;
            filter: blur(0.8px);
          }
        }

        /* Particle animations */
        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }

        @keyframes particleGlow {
          0%,
          100% {
            box-shadow: 0 0 1px currentColor;
          }
          50% {
            box-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
