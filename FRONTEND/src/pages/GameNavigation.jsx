import { Zap, Trophy, Users, Settings } from 'lucide-react';
import MultiplayerHeader from '../components/components/multiplayer/MultiplayerHeader';

export default function GameNavigation() {
  return (
    <nav className="relative z-50 border-b border-neutral-800/50 bg-neutral-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <MultiplayerHeader />
      </div>
    </nav>
  );
}
