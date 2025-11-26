import { useState, useEffect } from "react";
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
import { useRoomSocket } from "../../../../hooks/useRoomSocket";
import { generateRaceWords } from "../../../../utils/generateRaceWords";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import MultiplayerTypingArea from "../../../../pages/MultiplayerTypingArea";
import RaceResults from "./RaceResults";

export default function InRoom() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const roomData = location.state;
  
  const {
    room,
    users,
    roomCode,
    isConnected,
    toggleReady,
    startRace,
    socket,
    sendWords,
    joinRoom: joinRoomFn,
    joinByCode: joinByCodeFn,
    playerProgress,
    latestResults,
    messages,
    sendChatMessage,
  } = useRoomSocket();

  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [raceState, setRaceState] = useState("waiting");
  const [countdown, setCountdown] = useState(0);
  const [startingRace, setStartingRace] = useState(false);

  const currentRoomCode = roomCode || roomData?.roomCode || "";
  const currentRoomId = room?.id || roomData?.roomId;
  const isOwner = room?.ownerId === socket?.id;
  const currentUsers = users.length > 0 ? users : roomData?.users || [];
  const defaultSettings = {
    mode: "words",
    option: 10,
    wordCount: 30,
    timeDuration: 30,
  };
  const currentSettings =
    room?.gameSettings || roomData?.gameSettings || defaultSettings;

  useEffect(() => {
    if (roomData?.roomId && socket?.connected && !room) {
      if (roomData.roomCode) {
        joinByCodeFn(roomData.roomCode, user?.name).catch(console.error);
      } else if (roomData.roomId) {
        joinRoomFn(roomData.roomId, user?.name).catch(console.error);
      }
    }
  }, [roomData, socket, room, joinRoomFn, joinByCodeFn, user]);

  useEffect(() => {
    if (!room?.state) return;
    setRaceState(room.state);
  }, [room?.state]);

  useEffect(() => {
    if (room?.state !== "countdown" || !room?.startTimestamp) {
      setCountdown(0);
      return;
    }

    const updateCountdown = () => {
      const remaining = Math.ceil((room.startTimestamp - Date.now()) / 1000);
      setCountdown(Math.max(0, remaining));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 200);
    return () => clearInterval(interval);
  }, [room?.state, room?.startTimestamp]);

  useEffect(() => {
    if (latestResults && latestResults.length) {
      setRaceState("completed");
    }
  }, [latestResults]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(currentRoomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !currentRoomId) return;
    try {
      await sendChatMessage(currentRoomId, trimmed);
      setMessage("");
    } catch (err) {
      console.error("chat send error", err);
    }
  };

  const handleStartRace = async () => {
    if (!currentRoomId) {
      alert("Room ID not found");
      return;
    }

    if (!isOwner) {
      alert("Only the host can start the race");
      return;
    }

    if (currentUsers.length < 2) {
      alert("Need at least 2 players to start");
      return;
    }

    try {
      setStartingRace(true);
      const raceWords = generateRaceWords(currentSettings);
      console.log(" before  sedning to the  server  : ", raceWords);
      await sendWords(currentRoomId, raceWords);
      await startRace(currentRoomId, 3000, raceWords.length);
    } catch (error) {
      console.error("Error starting race:", error);
      alert(error.error || "Failed to start race");
    } finally {
      setStartingRace(false);
    }
  };

  const handleToggleReady = async (userId) => {
    if (!currentRoomId) return;
    try {
      const user = currentUsers.find((u) => u.id === userId);
      const isReady = user?.status === "ready";
      await toggleReady(currentRoomId, !isReady);
    } catch (error) {
      console.error("Error toggling ready:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "bg-emerald-500";
      case "not-ready":
      case "idle":
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

  if (raceState === "countdown" || raceState === "running") {
    return (
      <MultiplayerTypingArea
        roomId={currentRoomId}
        words={room?.words || []}
        playerProgress={playerProgress}
      />
    );
  }

  if (raceState === "completed" && latestResults) {
    return (
      <RaceResults
        results={latestResults}
        roomCode={currentRoomCode}
        onBackToLobby={() => navigate({ to: "/play/multiplayer" })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="bg-black border-b border-neutral-800 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
                  {raceState === "countdown" ? "Race Starting..." : "Game Lobby"}
                </h1>
                <p className="text-neutral-400 text-sm">
                  {raceState === "countdown"
                    ? `Starting in ${countdown}...`
                    : "Waiting for players to join"}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-neutral-800/50 rounded-lg px-6 py-4 border border-neutral-700">
                  <div className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                    Room Code
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-mono font-medium text-white tracking-widest">
                      {currentRoomCode}
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
                          {currentUsers.length} in room
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-white text-sm transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentUsers.map((user) => {
                      const progress = playerProgress[user.id];
                      return (
                        <div
                          key={user.id}
                          className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-5 hover:bg-neutral-800 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center text-2xl border border-neutral-600">
                                {user.avatar || "👤"}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-normal text-lg">
                                    {user.name}
                                  </span>
                                  {user.isOwner && (
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
                                  {progress && (
                                    <>
                                      <span className="text-sm text-neutral-500">•</span>
                                      <span className="text-sm text-yellow-400">
                                        {progress.wpm} WPM
                                      </span>
                                      <span className="text-sm text-neutral-500">•</span>
                                      <span className="text-sm text-green-400">
                                        {progress.accuracy?.toFixed(1)}% acc
                                      </span>
                                    </>
                                  )}
                                </div>
                                {progress && (
                                  <div className="mt-2">
                                    <div className="w-full bg-neutral-700 rounded-full h-2">
                                      <div
                                        className="bg-blue-500 h-2 rounded-full transition-all"
                                        style={{ width: `${progress.progress || 0}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {!user.isOwner && isOwner && (
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleToggleReady(user.id)}
                                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 rounded text-neutral-200 text-sm transition-colors"
                                >
                                  Toggle Ready
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                  <div className="flex gap-4">
                    {isOwner && raceState === "waiting" && (
                      <button
                        onClick={handleStartRace}
                        disabled={
                          !isConnected || currentUsers.length < 2 || startingRace
                        }
                        className="flex-1 px-8 py-5 bg-white hover:bg-neutral-100 rounded-lg text-black font-medium text-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        {startingRace ? "Preparing..." : "Start Game"}
                      </button>
                    )}
                    <button
                      onClick={() => navigate({ to: "/" })}
                      className="px-8 py-5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-white font-medium transition-colors flex items-center gap-3"
                    >
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
                  {messages.map((msg) => {
                    const isSelf = msg.userId === socket?.id;
                    const formattedTs = new Date(msg.timestamp || Date.now()).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" }
                    );
                    return (
                      <div
                        key={msg.id}
                        className={`${
                          isSelf ? "ml-auto bg-neutral-800" : "bg-neutral-900"
                        } max-w-[85%] rounded-lg p-4 border ${
                          isSelf ? "border-neutral-700" : "border-neutral-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-neutral-400">
                            {isSelf ? `${msg.name || "You"} (You)` : msg.name || "Player"}
                          </span>
                          <span className="text-xs text-neutral-600">
                            {formattedTs}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-200 break-words leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    );
                  })}
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
