import { BarChart3, Home, Settings, Users } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

export default function BottomFixedNav() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none"
      style={{ 
        isolation: 'isolate',
        willChange: 'transform',
      }}
    >
      <div className="flex justify-center pb-6 px-4 pointer-events-auto" style={{ overflow: 'visible' }}>
        <div className="relative rounded-full bg-white/1 backdrop-blur-xl border border-white/5 p-3 shadow-2xl" style={{ overflow: 'visible' }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/2 to-transparent pointer-events-none" />

          <div className="relative flex gap-4" style={{ overflow: 'visible' }}>
            <NavButton 
              icon={<Home className="h-5 w-5" />} 
              label="Home" 
              path="/"
            />
            <NavButton 
              icon={<BarChart3 className="h-5 w-5" />} 
              label="Dashboard" 
              path="/dashboard"
            />
            <NavButton 
              icon={<Users className="h-5 w-5" />} 
              label="Team" 
              path="/play/multiplayer"
            />
            <NavButton 
              icon={<Settings className="h-5 w-5" />} 
              label="Settings" 
              path="#"
            />
          </div>
        </div>
      </div>
    </div> 
  );
}

function NavButton({ icon, label, path }) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const isActive = location.pathname === path || 
    (path === '/' && location.pathname === '/') ||
    (path === '/dashboard' && location.pathname.startsWith('/dashboard'));

  const handleClick = () => {
    if (path && path !== '#') {
      navigate({ to: path });
    }
  };

  return (
    <button
      className={`group relative rounded-full transition-all duration-300 ease-out justify-center items-center cursor-pointer ${
        isActive ? 'bg-white/10' : ''
      }`}
      style={{ width: '32px', height: '32px', overflow: 'visible' }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        const textEl = btn.querySelector('.nav-text');
        if (textEl) {
          // Force text to be visible for measurement
          textEl.style.opacity = '1';
          textEl.style.visibility = 'visible';
          // Use a small delay to ensure text is rendered before measuring
          requestAnimationFrame(() => {
            const textWidth = textEl.scrollWidth || 0;
            btn.style.width = `${48 + textWidth + 24}px`;
          });
        }
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.width = '32px';
        const textEl = btn.querySelector('.nav-text');
        if (textEl) {
          // Reset to let CSS handle the transition
          textEl.style.opacity = '';
          textEl.style.visibility = '';
        }
      }}
      aria-label={label}
      type="button"
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 pointer-events-none rounded-full" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear',
          }}
        />
      </div>

      <div className="relative flex items-center justify-start h-full px-3 z-20">
        <div className={`flex-shrink-0 transition-colors duration-300 group-hover:scale-110 ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
        }`}>
          {icon}
        </div>

        <span
          className="nav-text ml-3 whitespace-nowrap text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide"
          style={{ 
            zIndex: 20,
            position: 'relative',
            pointerEvents: 'auto'
          }}
        >
          {label}
        </span>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-[calc(100%-16px)] transition-all duration-500 pointer-events-none" />
    </button>
  );
}
