import React from "react";
import { Users, Cpu, Zap, Play, ArrowRight } from "lucide-react"; 
import aiBattle from "../../../assets/vs.png";

const UpcomingFeature = () => {
  return (
    <section className="relative min-h-[6rem] py-26 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Upcoming <span className="font-normal italic">Feature</span>
          </h2>
          <div className="w-26 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-8" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-4 bg-gradient-to-br from-purple-950/40 via-blue-600/20 to-purple-950/40 rounded-3xl blur-xl" />

          <div className="bg-black relative bg-gradient-to-br from-gray-900/10 via-gray-950 to-gray-900/10 backdrop-blur-xl border border-gray-700/80 rounded-3xl p-8 md:p-12">
            <img className="w-60 mx-auto mt-0 mb-8" src={aiBattle} alt="AI Battle" />

            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                AI Challenge Mode
              </h3>
              <p className="text-lg text-gray-300 font-light">
                Compete against an AI! Choose your difficulty: Easy, Medium, or Hard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 text-pink-300" />
                </div>
                <h4 className="text-white font-medium mb-2">Real-time AI Gameplay</h4>
                <p className="text-gray-400 text-sm font-light">
                  Watch the AI compete with you live.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-5 h-5 text-blue-300" />
                </div>
                <h4 className="text-white font-medium mb-2">Difficulty Levels</h4>
                <p className="text-gray-400 text-sm font-light">
                  Easy, Medium, Hard – choose the AI level.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="text-white font-medium mb-2">Instant Matches</h4>
                <p className="text-gray-400 text-sm font-light">
                  Quick setup to start battling the AI immediately.
                </p>
              </div>
            </div>

            <div className="text-center">
              <button className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <span>Get Notified</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-ping" />
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-blue-400/30 rounded-full animate-ping delay-1000" />
    </section>
  );
};

export default UpcomingFeature;
