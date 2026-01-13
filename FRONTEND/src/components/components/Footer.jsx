import { Mail, MapPin, Phone, Github, Linkedin, ExternalLink, Sparkles } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
         
          <div className="md:col-span-4 space-y-6">
            <div className="inline-flex items-center space-x-4 group cursor-pointer">
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
                    <span className="text-xl font-bold text-slate-100 group-hover:text-white tracking-wide transition-all duration-500 ml-1">
                      Strike
                    </span>
                    <span className="text-md font-light text-slate-400 group-hover:text-slate-300 ml-1">
                      .Ai
                    </span>
                  </div>
                  <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-all duration-500 mt-1"></div>
                </div>
              </div>
            </div>

            <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-sm tracking-wide">
              Elevating typing skills through intelligent practice, analytics, and competition.
            </p>
            
            {/* Portfolio Badge - More Professional */}
            <div className="pt-4">
              <a 
                href="https://ishasah-portfolio.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-neutral-500 animate-pulse"></div>
                <span className="text-sm text-neutral-300 font-light tracking-wide">Explore Creator's Portfolio</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <h3 className="text-white font-light text-sm tracking-[0.2em] uppercase mb-6">
              Platform
            </h3>
            <nav className="flex flex-col space-y-4">
              {["Features", "Pricing", "Roadmap", "Changelog"].map((item) => (
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
              Resources
            </h3>
            <nav className="flex flex-col space-y-4">
              {[
                "Documentation",
                "API Reference",
                "Case Studies",
                "Blog"
              ].map((item) => (
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
              Connect
            </h3>
            
            {/* Portfolio Card - Elegant Integration */}
            {/* <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-900/30 flex items-center justify-center border border-white/10">
                    <Sparkles className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide text-sm">Built by Isha Sah</div>
                    <div className="text-xs text-neutral-400 font-extralight tracking-wide">Full-Stack Developer</div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-neutral-400 font-extralight tracking-wide mb-3 leading-relaxed">
                Crafting elegant digital experiences with modern technologies.
              </p>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/ishasah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://linkedin.com/in/ishasah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://yourportfolio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-2 bg-gradient-to-r from-slate-700/20 to-slate-900/20 hover:from-slate-700/30 hover:to-slate-900/30 rounded-lg transition-all duration-300 group border border-white/10"
                >
                  <span className="text-xs text-neutral-300 font-light tracking-wide">View Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white" />
                </a>
              </div>
            </div> */}

            <div className="space-y-4 pt-4">
            <a 
                  href="https://github.com/ishasah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                className="flex items-start space-x-3 text-neutral-400 hover:text-white transition-colors duration-300 group"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300"/>
                  <span className="font-light text-sm tracking-wide">
                  Github
                </span>
                </a>
              <a
                href="mailto:hello@typestrike.ai"
                className="flex items-start space-x-3 text-neutral-400 hover:text-white transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-light text-sm tracking-wide">
                  hello@typestrike.ai
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
                  San Francisco, CA
                  <br />
                  <span className="text-xs text-neutral-500">Remote-first company</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright with Portfolio Link */}
            <div className="flex flex-col items-start">
              <p className="text-neutral-500 font-light text-sm tracking-wider">
                © {new Date().getFullYear()} TypeStrike.AI. All rights reserved.
              </p>
              <p className="text-neutral-600 font-extralight text-xs tracking-wide mt-2">
                Crafted with precision by{" "}
                <a 
                  href="https://yourportfolio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-300 border-b border-dotted border-neutral-600 hover:border-neutral-400"
                >
                  Isha Sah
                </a>
                . Explore more projects.
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <a
                href="/privacy"
                className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
              >
                Terms of Service
              </a>
              <a
                href="https://ishasah-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white font-light text-sm tracking-wide transition-all duration-300 flex items-center gap-1"
              >
                Hire Developer
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;