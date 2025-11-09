import { useState } from "react";
import {
  Users,
  MessageSquare,
  Crown,
  Copy,
  Check,
  Play,
  Settings,
  LogOut,
  UserX,
  Shield,
} from "lucide-react";

export default function InRoom() {
  const [roomCode] = useState("GAME-XY42");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "You (Host)",
      avatar: "👑",
      status: "ready",
      isHost: true,
    },
    {
      id: "2",
      name: "Player_123",
      avatar: "🎮",
      status: "ready",
      isHost: false,
    },
    {
      id: "3",
      name: "TypeMaster",
      avatar: "⌨️",
      status: "not-ready",
      isHost: false,
    },
    {
      id: "4",
      name: "SpeedTyper99",
      avatar: "⚡",
      status: "idle",
      isHost: false,
    },
  ]);
  const [messages, setMessages] = useState([
    {
      id: "1",
      userId: "1",
      userName: "You",
      message: "Welcome to the game!",
      timestamp: "10:30",
    },
    {
      id: "2",
      userId: "2",
      userName: "Player_123",
      message: "Hey everyone!",
      timestamp: "10:31",
    },
    {
      id: "3",
      userId: "3",
      userName: "TypeMaster",
      message: "Ready to compete!",
      timestamp: "10:32",
    },
  ]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          userId: "1",
          userName: "You",
          message: message.trim(),
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  const kickUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const toggleReady = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "ready" ? "not-ready" : "ready" }
          : u
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "bg-emerald-500";
      case "not-ready":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "ready":
        return "Ready";
      case "not-ready":
        return "Not Ready";
      default:
        return "Idle";
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="bg-black border-b border-neutral-800 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
                  Game Lobby
                </h1>
                <p className="text-neutral-400 text-sm">
                  Waiting for players to join
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-neutral-800/50 rounded-lg px-6 py-4 border border-neutral-700">
                  <div className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                    Room Code
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-mono font-medium text-white tracking-widest">
                      {roomCode}
                    </span>
                    <button
                      onClick={copyRoomCode}
                      className="p-2 hover:bg-neutral-700 rounded transition-colors"
                      title="Copy room code"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-8 border-r border-neutral-800">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-neutral-400" />
                      <div>
                        <h2 className="text-2xl font-light text-white">
                          Players
                        </h2>
                        <p className="text-sm text-neutral-500">
                          {users.length} in room
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-white text-sm transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-5 hover:bg-neutral-800 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center text-2xl border border-neutral-600">
                              {user.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-normal text-lg">
                                  {user.name}
                                </span>
                                {user.isHost && (
                                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-xs flex items-center gap-1 uppercase tracking-wide">
                                    <Crown className="w-3 h-3" />
                                    Host
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${getStatusColor(
                                    user.status
                                  )}`}
                                />
                                <span className="text-sm text-neutral-400">
                                  {getStatusText(user.status)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {!user.isHost && (
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => toggleReady(user.id)}
                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 rounded text-neutral-200 text-sm transition-colors"
                              >
                                Toggle Ready
                              </button>
                              <button
                                onClick={() => kickUser(user.id)}
                                className="p-2 bg-red-950/30 hover:bg-red-950/50 border border-red-900/30 rounded text-red-400 transition-colors"
                                title="Kick player"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                  <div className="flex gap-4">
                    <button className="flex-1 px-8 py-5 bg-white hover:bg-neutral-100 rounded-lg text-black font-medium text-lg transition-all flex items-center justify-center gap-3 group">
                      <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Start Game
                    </button>
                    <button className="px-8 py-5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-white font-medium transition-colors flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      Leave
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-black">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-neutral-400" />
                    <div>
                      <h3 className="text-xl font-light text-white">Chat</h3>
                      <p className="text-xs text-neutral-500">
                        Talk with other players
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[500px]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${
                        msg.userId === "1"
                          ? "ml-auto bg-neutral-800"
                          : "bg-neutral-900"
                      } max-w-[85%] rounded-lg p-4 border ${
                        msg.userId === "1"
                          ? "border-neutral-700"
                          : "border-neutral-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-400">
                          {msg.userName}
                        </span>
                        <span className="text-xs text-neutral-600">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-200 break-words leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={sendMessage}
                  className="p-6 border-t border-neutral-800"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-700 focus:border-neutral-700"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:bg-neutral-100 rounded-lg text-black font-medium transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
