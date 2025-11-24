import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const RoomSocketContext = createContext(null);

export const RoomSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [latestResults, setLatestResults] = useState(null);
  const [playerProgress, setPlayerProgress] = useState({});
  const [messages, setMessages] = useState([]);
  const [shouldConnect, setShouldConnect] = useState(false);
  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (!shouldConnect) {
      return undefined;
    }

    const socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setRoom(null);
      setUsers([]);
      setRoomCode("");
      setPlayerProgress({});
      setLatestResults(null);
    };

    const handleRoomUsers = (data) => {
      setUsers(data.users || []);
      if (data.roomId) {
        setRoom((prev) => ({
          ...prev,
          ...data,
        }));
        if (data.code) {
          setRoomCode(data.code);
        }
      }
    };

    const handleKicked = (data) => {
      console.warn("Kicked from room:", data);
      setRoom(null);
      setUsers([]);
      setRoomCode("");
      setPlayerProgress({});
    };

    const handleRaceStart = (data) => {
      setRoom((prev) => ({
        ...prev,
        state: "countdown",
        words: data.words,
        startTimestamp: data.startTimestamp,
        gameSettings: data.gameSettings || prev?.gameSettings,
      }));
      setPlayerProgress({});
      setLatestResults(null);
    };

    const handleRaceRunning = () => {
      setRoom((prev) => ({
        ...prev,
        state: "running",
      }));
    };

    const handlePlayerProgress = (data) => {
      setPlayerProgress((prev) => ({
        ...prev,
        [data.userId]: data,
      }));
    };

    const handlePlayerFinished = (data) => {
      setPlayerProgress((prev) => ({
        ...prev,
        [data.userId]: {
          ...(prev[data.userId] || {}),
          ...data,
          finished: true,
        },
      }));
    };

    const handleRaceComplete = (data) => {
      setRoom((prev) => ({
        ...prev,
        state: "completed",
      }));
      setLatestResults(data.results || []);
    };

    const handleWordsPrepared = (data) => {
      setRoom((prev) => ({
        ...prev,
        words: data.words,
      }));
    };

    const handleWordsBroadcast = (data) => {
      setRoom((prev) => ({
        ...prev,
        words: data.words,
      }));
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("roomUsers", handleRoomUsers);
    socket.on("kicked", handleKicked);
    socket.on("raceStart", handleRaceStart);
    socket.on("raceRunning", handleRaceRunning);
    socket.on("playerProgress", handlePlayerProgress);
    socket.on("playerFinished", handlePlayerFinished);
    socket.on("raceComplete", handleRaceComplete);
    socket.on("wordsPrepared", handleWordsPrepared);
    socket.on("wordsBroadcast", handleWordsBroadcast);

    const handleChatMessage = (chatEntry) => {
      setMessages((prev) => [...prev, chatEntry]);
    };

    socket.on("chatMessage", handleChatMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("roomUsers", handleRoomUsers);
      socket.off("kicked", handleKicked);
      socket.off("raceStart", handleRaceStart);
      socket.off("raceRunning", handleRaceRunning);
      socket.off("playerProgress", handlePlayerProgress);
      socket.off("playerFinished", handlePlayerFinished);
      socket.off("raceComplete", handleRaceComplete);
      socket.off("wordsPrepared", handleWordsPrepared);
      socket.off("wordsBroadcast", handleWordsBroadcast);
      socket.off("chatMessage", handleChatMessage);
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setRoom(null);
      setUsers([]);
      setRoomCode("");
      setPlayerProgress({});
      setMessages([]);
      setLatestResults(null);
    };
  }, [shouldConnect]);

  useEffect(() => {
    if (!shouldConnect) {
      setIsConnected(false);
      setRoom(null);
      setUsers([]);
      setRoomCode("");
      setPlayerProgress({});
      setLatestResults(null);
      setMessages([]);
    }
  }, [shouldConnect]);

  const connectSocket = useCallback(() => {
    setShouldConnect(true);
  }, []);

  const disconnectSocket = useCallback(() => {
    setShouldConnect(false);
  }, []);

  const ensureConnected = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      throw new Error("Socket not connected");
    }
    return socket;
  }, []);

  const createRoom = useCallback(
    (roomName, displayName, gameSettings = {}) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit(
          "createRoom",
          {
            name: roomName,
            displayName: displayName || user?.name || "Anonymous",
            gameSettings,
          },
          (error, roomData) => {
            if (error) {
              reject(error);
            } else {
              setRoom(roomData);
              setRoomCode(roomData.code);
              setUsers(roomData.users || []);
              setMessages(roomData.chat || []);
              resolve(roomData);
            }
          }
        );
      }),
    [ensureConnected, user?.name]
  );

  const joinRoom = useCallback(
    (roomId, displayName) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit(
          "userJoins",
          {
            roomId,
            displayName: displayName || user?.name || "Anonymous",
          },
          (error, roomData) => {
            if (error) {
              reject(error);
            } else {
              setRoom(roomData);
              setRoomCode(roomData.code);
              setUsers(roomData.users || []);
              setMessages(roomData.chat || []);
              resolve(roomData);
            }
          }
        );
      }),
    [ensureConnected, user?.name]
  );

  const joinByCode = useCallback(
    (code, displayName) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit(
          "joinByCode",
          {
            code: code?.toUpperCase(),
            displayName: displayName || user?.name || "Anonymous",
          },
          (error, roomData) => {
            if (error) {
              reject(error);
            } else {
              setRoom(roomData);
              setRoomCode(roomData.code);
              setUsers(roomData.users || []);
              setMessages(roomData.chat || []);
              resolve(roomData);
            }
          }
        );
      }),
    [ensureConnected, user?.name]
  );

  const toggleReady = useCallback(
    (roomId, ready) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit("toggleReady", { roomId, ready }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }),
    [ensureConnected]
  );

  const startRace = useCallback(
    (roomId, countdownMs = 3000, wordCount = 50) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit(
          "startRace",
          { roomId, countdownMs, wordCount },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      }),
    [ensureConnected]
  );

  const sendWords = useCallback(
    (roomId, words) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit("sendWords", { roomId, words }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }),
    [ensureConnected]
  );

  const finishRace = useCallback(
    (roomId, result) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit("raceFinish", { roomId, ...result }, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      }),
    [ensureConnected]
  );

  const sendChatMessage = useCallback(
    (roomId, text) =>
      new Promise((resolve, reject) => {
        let socket;
        try {
          socket = ensureConnected();
        } catch (err) {
          reject(err);
          return;
        }

        socket.emit(
          "chatMessage",
          { roomId, message: text },
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      }),
    [ensureConnected]
  );

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      room,
      users,
      roomCode,
      isConnected,
      latestResults,
      playerProgress,
      messages,
      createRoom,
      joinRoom,
      joinByCode,
      toggleReady,
      startRace,
      sendWords,
      finishRace,
      sendChatMessage,
      connectSocket,
      disconnectSocket,
      connectionRequested: shouldConnect,
    }),
    [
      room,
      users,
      roomCode,
      isConnected,
      latestResults,
      playerProgress,
      messages,
      createRoom,
      joinRoom,
      joinByCode,
      toggleReady,
      startRace,
      sendWords,
      finishRace,
      sendChatMessage,
      connectSocket,
      disconnectSocket,
      shouldConnect,
    ]
  );

  return (
    <RoomSocketContext.Provider value={value}>
      {children}
    </RoomSocketContext.Provider>
  );
};

export const useRoomSocket = () => {
  const context = useContext(RoomSocketContext);
  if (!context) {
    throw new Error("useRoomSocket must be used within a RoomSocketProvider");
  }
  return context;
};