export const config = {
    // Colors
    playerColors: [
      '#F59E0B', '#06B6D4', '#EC4899', '#10B981', 
      '#8B5CF6', '#F97316', '#14B8A6', '#EF4444',
    ],
    
    // Podium
    podiumHeights: {
      0: "h-64",
      1: "h-48", 
      2: "h-40",
      default: "h-32"
    },
    
    podiumColors: {
      0: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/50",
      1: "from-neutral-600/20 to-neutral-700/5 border-neutral-500/50",
      2: "from-amber-700/20 to-amber-800/5 border-amber-600/50",
      default: "from-neutral-800/20 to-neutral-900/5 border-neutral-700/50"
    },
    
    // Graph
    graph: {
      width: 1000,
      height: 500,
      padding: { top: 40, right: 140, bottom: 60, left: 60 },
      points: 20,
      gridLines: 5,
      progressPoints: [0, 25, 50, 75, 100]
    },
    
    // UI
    ui: {
      avatarFallback: "👤",
      nameFallback: "Player",
      animationDuration: 1000,
      defaultDelay: 100
    }
  };