import { Mail, MapPin, Phone } from "lucide-react";
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

                {/* Text */}
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

            {/* Minimal/casual copy */}
            <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-sm tracking-wide">
              Built for fun, learning, and practice.
            </p>
          </div>

          <div className="md:col-span-2 space-y-5">
            <h3 className="text-white font-light text-sm tracking-[0.2em] uppercase mb-6">
              Product
            </h3>
            <nav className="flex flex-col space-y-4">
              {["Features", "Pricing", "Updates"].map((item) => (
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
              Fun Stuff
            </h3>
            <nav className="flex flex-col space-y-4">
              {[
                "Why I Built This",
                "Future Plans",
                "Blog Posts"
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
            {/* Casual single-line footer */}
            <p className="text-neutral-500 font-light text-sm tracking-wider">
              Made with ❤️ by Isha Sah — thanks for stopping by.
            </p>

            {/* Minimal links */}
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white font-light text-sm tracking-wide transition-all duration-300"
              >
                About
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
