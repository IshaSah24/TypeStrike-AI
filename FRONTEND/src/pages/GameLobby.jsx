import { useState } from "react";
import {
  Plus,
  Search,
  Users,
  Clock,
  Zap,
  Lock,
  Globe,
  Copy,
  Check,
} from "lucide-react";
import CreateRoomOptions from "../components/components/multiplayer/CreateRoomOptions";
import { useTypingGame } from "../context/TypingGameContext";
import { Navigate, useNavigate } from "@tanstack/react-router";
import MultiplayerTypingArea from "./MultiplayerTypingArea";

export default function GameLobby() {
  const navigate = useNavigate();

  const typingGame = useTypingGame();
  const {
    handleModeSelect,
    handleOptionSelect,
    setTimeDuration,
    timeDuration,
    setWordCount,
    wordCount,mode
  } = typingGame;

  const [inRoom, setInRoom] = useState(false);
  const [activeTab, setActiveTab] = useState("join");
  const [roomCode, setRoomCode] = useState("");

  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  // local state for selections (local only until create clicked)
  const [localMode, setLocalMode] = useState("words"); // default
  const [localOpt, setLocalOpt] = useState(10); // default for words

  // callbacks passed to CreateRoomOptions component
  const localSelectMode = (m, opt = null) => {
    setLocalMode(m);
    // if option passed along with mode, set it; otherwise keep previous localOpt (or null)
    if (opt !== null && opt !== undefined) setLocalOpt(opt);
  };
  const localSelectOpt = (opt) => {
    setLocalOpt(opt);
  };

  const activeRooms = [
    /* ... your existing array (unchanged) ... */
    {
      id: 1,
      name: "Speed Demons",
      players: 3,
      maxPlayers: 4,
      difficulty: "Hard",
      host: "ProTyper99",
      isPrivate: false,
    },
    {
      id: 2,
      name: "Casual Practice",
      players: 2,
      maxPlayers: 6,
      difficulty: "Easy",
      host: "NewbieTyper",
      isPrivate: false,
    },
    {
      id: 3,
      name: "Elite Championship",
      players: 4,
      maxPlayers: 4,
      difficulty: "Expert",
      host: "TypeMaster",
      isPrivate: false,
    },
    {
      id: 4,
      name: "Learning Together",
      players: 1,
      maxPlayers: 3,
      difficulty: "Medium",
      host: "FriendlyHost",
      isPrivate: false,
    },
    {
      id: 5,
      name: "Night Owls Session",
      players: 5,
      maxPlayers: 8,
      difficulty: "Medium",
      host: "NightTyper",
      isPrivate: false,
    },
  ];
  
  // Debugging
  // const generateRoomCode = () => {
  //   const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   setGeneratedCode(code);
  // };

  // const copyToClipboard = () => {
  //   if (!generatedCode) return;
  //   navigator.clipboard.writeText(generatedCode);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Hard":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "Expert":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-neutral-400 bg-neutral-400/10 border-neutral-400/20";
    }
  };

  // This is called only when user clicks "Create Room"
  // called when user clicks "Create Room"
  const handleCreateRoom = () => {
    // ensure numeric option
    const opt = Number(localOpt);

    // update context/selectors only now
    if (typeof handleModeSelect === "function") handleModeSelect (localMode);
    console.log("mode is -->  ",  localMode) ;
    
    if (typeof handleOptionSelect === "function") handleOptionSelect(opt);
    console.log("option is -->  ", opt) ;
    

    // set specialized setters based on mode
    if (localMode === "time") {
      // update time duration in context with the option we got
      if (typeof setTimeDuration === "function") setTimeDuration(opt);
    } else if (localMode === "words") {
      if (typeof setWordCount === "function") setWordCount(opt);
    } else if (localMode === "quote") {
      // if (typeof setQuoteCount === "function") setQuoteCount(opt);
    }

    setInRoom(true); // not usinf  for conditional  rendering  as of  now

    if (roomName){
      navigate({ to: "/multiplayer/area" });
    }else {
      alert("Please generate a room code before creating a room.");
    }
    // further actions: navigate, API call, open modal, etc.
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* ... keep the rest of your layout identical ... */}

      <div className="relative overflow-hidden">
        {/* background elements omitted for brevity (keep yours) */}

        <div className="relative z-10 mb-12 text-center">
          <h2 className="text-5xl pt-8 font-extralight text-white pt-8 mb-4 tracking-tight">
            Game <span className="font-light">Lobby</span>
          </h2>
          <p className="text-neutral-400 text-lg font-extralight tracking-wide">
            Create your own room or join an existing battle
          </p>
        </div>

        <div className="relative z-10 bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-neutral-800/50 shadow-2xl overflow-hidden">
          <div className="flex border-b border-neutral-800/50">
            {/* join/create tabs (unchanged) */}
            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 px-8 py-5 text-sm font-light tracking-wider uppercase transition-all duration-300 relative group ${
                activeTab === "join"
                  ? "text-white bg-neutral-800/30"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/10"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Join Room</span>
              </div>
              {activeTab === "join" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 px-8 py-5 text-sm font-light tracking-wider uppercase transition-all duration-300 relative group ${
                activeTab === "create"
                  ? "text-white bg-neutral-800/30"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/10"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Create Room</span>
              </div>
              {activeTab === "create" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              )}
            </button>
          </div>

          <div className="p-8">
            {activeTab === "join" ? (
              // ... join tab (unchanged) ...
              <div className="space-y-8">
                {/* search input and active rooms rendered as before */}
                <div className="max-w-2xl mx-auto">
                  <div className="relative group mb-8">
                    <input
                      type="text"
                      placeholder="Enter room code or search by name..."
                      value={roomCode}
                      onChange={(e) =>
                        setRoomCode(e.target.value.toUpperCase())
                      }
                      className="w-full p-5 pl-14 pr-6 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 group-hover:border-neutral-600/70 font-light tracking-wider"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-neutral-700/50"></div>
                    <span className="text-xs text-neutral-500 font-light tracking-wider uppercase">
                      Active Rooms
                    </span>
                    <div className="flex-1 h-px bg-neutral-700/50"></div>
                  </div>
                </div>

                <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeRooms.map((room) => (
                    <div
                      key={room.id}
                      className="group relative bg-neutral-800/30 hover:bg-neutral-800/50 border border-neutral-700/30 hover:border-neutral-600/50 rounded-xl p-6 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl border border-neutral-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <Zap className="w-6 h-6 text-white/80" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-light text-white tracking-tight">
                                {room.name}
                              </h3>
                              {room.isPrivate && (
                                <Lock className="w-4 h-4 text-neutral-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-neutral-400 font-extralight">
                              <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                {room.players}/{room.maxPlayers}
                              </span>
                              <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
                              <span>Host: {room.host}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div
                            className={`px-4 py-1.5 rounded-lg text-xs font-light tracking-wider uppercase border ${getDifficultyColor(
                              room.difficulty
                            )}`}
                          >
                            {room.difficulty}
                          </div>

                          <button className="px-6 py-2.5 bg-white text-black rounded-lg hover:bg-neutral-50 transition-all duration-300 font-light tracking-wide text-sm hover:scale-105 hover:shadow-lg hover:shadow-white/10">
                            Join
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              //   creation  of the room
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-4">
                  {/* pass the correct props to CreateRoomOptions */}
                  <CreateRoomOptions
                    localSelectMode={localSelectMode}
                    localSelectOpt={localSelectOpt}
                  />

                  {/* Room name input */}
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2 font-light tracking-wide">
                      Room Name
                    </label>
                    <input
                       required = {true}
                      type="text"
                      placeholder="Enter a memorable room name..."
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 hover:border-neutral-600/70 font-light"
                    />
                  </div>

                  {/* ... remaining UI unchanged ... */}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2 font-light tracking-wide">
                        Max Players
                      </label>
                      <div className="relative">
                        <select
                          value={maxPlayers}
                          onChange={(e) =>
                            setMaxPlayers(Number(e.target.value))
                          }
                          className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 hover:border-neutral-600/70 font-light appearance-none cursor-pointer"
                        >
                          {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} Players
                            </option>
                          ))}
                        </select>
                        <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-neutral-400 mb-2 font-light tracking-wide">
                        Difficulty
                      </label>
                      <div className="relative">
                        <select className="w-full p-4 border border-neutral-700/50 rounded-xl bg-neutral-800/30 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 hover:border-neutral-600/70 font-light appearance-none cursor-pointer">
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                          <option>Expert</option>
                        </select>
                        <Zap className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2 font-light tracking-wide">
                      Room Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setIsPrivate(false)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          !isPrivate
                            ? "bg-neutral-700/50 border-neutral-600 text-white"
                            : "bg-neutral-800/30 border-neutral-700/50 text-neutral-400 hover:border-neutral-600/70"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <Globe className="w-5 h-5" />
                          <span className="font-light tracking-wide">
                            Public
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-extralight">
                          Anyone can join
                        </p>
                      </button>

                      <button
                        onClick={() => setIsPrivate(true)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          isPrivate
                            ? "bg-neutral-700/50 border-neutral-600 text-white"
                            : "bg-neutral-800/30 border-neutral-700/50 text-neutral-400 hover:border-neutral-600/70"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <Lock className="w-5 h-5" />
                          <span className="font-light tracking-wide">
                            Private
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-extralight">
                          Invite only   
                        </p>
                      </button>
                    </div>
                  </div>

                  {generatedCode && (
                    <div className="p-6 bg-neutral-800/40 border border-neutral-700/50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-neutral-400 font-light tracking-wide">
                          Room Code
                        </span>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-700/50 transition-all duration-300"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-3xl font-light text-white tracking-[0.3em] text-center py-2">
                        {generatedCode}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={generateRoomCode}
                    className="flex-1 py-4 border border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-300 font-light tracking-wide hover:scale-[1.02]"
                  >
                    Generate Code
                  </button>

                  <button
                    onClick={handleCreateRoom}
                    className="flex-1 bg-gradient-to-r from-white via-neutral-50 to-white text-black py-4 rounded-xl hover:from-neutral-50 hover:via-white hover:to-neutral-50 transition-all duration-500 font-light tracking-wider shadow-2xl hover:shadow-white/10 relative overflow-hidden group hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    <span className="relative z-10 uppercase text-sm font-medium tracking-[0.15em]">
                      Create Room
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(38, 38, 38, 0.3);
        border-radius: 3px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(115, 115, 115, 0.5);
        border-radius: 3px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(115, 115, 115, 0.7);
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `}</style>
    </div>
  );
}
