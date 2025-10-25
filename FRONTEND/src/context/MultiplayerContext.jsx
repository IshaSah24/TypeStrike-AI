// context/MultiplayerContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const MultiplayerContext = createContext();

export const MultiplayerProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [gameState, setGameState] = useState('waiting'); // waiting, counting-down, playing, finished
  const [isHost, setIsHost] = useState(false);
  const [roomSettings, setRoomSettings] = useState({});

  const createRoom = useCallback((settings) => {
    // Implementation for creating room
    setIsHost(true);
    setRoomSettings(settings);
  }, []);

  const joinRoom = useCallback((roomId) => {
    // Implementation for joining room
    setIsHost(false);
  }, []);

  const leaveRoom = useCallback(() => {
    setRoomId(null);
    setPlayers([]);
    setIsHost(false);
    setGameState('waiting');
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    // Notify other players
  }, []);

  const resetGame = useCallback(() => {
    setGameState('waiting');
    // Notify other players
  }, []);

  const updateRoomSettings = useCallback((settings) => {
    setRoomSettings(settings);
    // Notify other players
  }, []);

  return (
    <MultiplayerContext.Provider value={{
      roomId,
      setRoomId,
      players,
      setPlayers,
      currentPlayerId,
      setCurrentPlayerId,
      gameState,
      setGameState,
      isHost,
      setIsHost,
      roomSettings,
      createRoom,
      joinRoom,
      leaveRoom,
      startGame,
      resetGame,
      updateRoomSettings,
    }}>
      {children}
    </MultiplayerContext.Provider>
  );
};

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};