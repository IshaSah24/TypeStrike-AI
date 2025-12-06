export default function RaceGraph({ 
    sortedResults, 
    graphMetric, 
    hoveredPlayer, 
    setHoveredPlayer, 
    getPlayerColor 
  }) {
    const padding = { top: 40, right: 140, bottom: 60, left: 60 };
    const width = 1000;
    const height = 500;
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;
  
    const generateRaceData = (player) => {
      const points = 20;
      const data = [];
      const finalWpm = player.wpm || 0;
      const finalErrors = player.errors || 0;
      const finalCorrect = player.correctChars || 0;
  
      for (let i = 0; i <= points; i++) {
        const progress = i / points;
        const variance = Math.sin(i * 0.5) * 5;
  
        if (graphMetric === "wpm") {
          const wpm = finalWpm * progress + variance;
          data.push({ x: progress * 100, y: Math.max(0, wpm) });
        } else if (graphMetric === "errors") {
          const errors = finalErrors * Math.pow(progress, 1.5);
          data.push({ x: progress * 100, y: errors });
        } else if (graphMetric === "correct") {
          const correct = finalCorrect * progress;
          data.push({ x: progress * 100, y: correct });
        }
      }
      return data;
    };
  
    const allData = sortedResults.map((player, idx) => ({
      player,
      data: generateRaceData(player),
      color: getPlayerColor(idx)
    }));
  
    let maxY = 0;
    allData.forEach(({ data }) => {
      data.forEach(point => {
        if (point.y > maxY) maxY = point.y;
      });
    });
  
    maxY = Math.ceil(maxY * 1.1);
  
    const getX = (value) => padding.left + (value / 100) * graphWidth;
    const getY = (value) => padding.top + graphHeight - (value / maxY) * graphHeight;
  
    const createPath = (data) => {
      if (data.length === 0) return "";
      let path = `M ${getX(data[0].x)} ${getY(data[0].y)}`;
      for (let i = 1; i < data.length; i++) {
        path += ` L ${getX(data[i].x)} ${getY(data[i].y)}`;
      }
      return path;
    };
  
    const gridLines = 5;
    const yGridValues = Array.from({ length: gridLines + 1 }, (_, i) => (maxY / gridLines) * i);
  
    return (
      <div className="relative w-full overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          <defs>
            {allData.map(({ color }, idx) => (
              <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
              </linearGradient>
            ))}
          </defs>
  
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="#1a1a1a" rx="4" />
  
          {yGridValues.map((value, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={getY(value)}
                x2={padding.left + graphWidth}
                y2={getY(value)}
                stroke="#2a2a2a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={getY(value) + 4}
                fill="#666"
                fontSize="12"
                textAnchor="end"
              >
                {Math.round(value)}
              </text>
            </g>
          ))}
  
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1={getX(value)}
                y1={padding.top}
                x2={getX(value)}
                y2={padding.top + graphHeight}
                stroke="#2a2a2a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={getX(value)}
                y={padding.top + graphHeight + 20}
                fill="#666"
                fontSize="12"
                textAnchor="middle"
              >
                {value}%
              </text>
            </g>
          ))}
  
          {allData.map(({ player, data, color }, idx) => {
            const path = createPath(data);
            const areaPath = path + ` L ${getX(100)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`;
            const isHovered = hoveredPlayer === player.userId;
            const isAnyHovered = hoveredPlayer !== null;
  
            return (
              <g
                key={player.userId}
                opacity={isAnyHovered ? (isHovered ? 1 : 0.3) : 1}
                style={{ transition: 'opacity 0.3s' }}
              >
                <path
                  d={areaPath}
                  fill={`url(#gradient-${idx})`}
                  opacity="0.5"
                />
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={isHovered ? 4 : 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'stroke-width 0.3s' }}
                />
                {data.map((point, pointIdx) => (
                  <circle
                    key={pointIdx}
                    cx={getX(point.x)}
                    cy={getY(point.y)}
                    r={isHovered ? 5 : 0}
                    fill={color}
                    stroke="#131313"
                    strokeWidth="2"
                    style={{ transition: 'r 0.3s' }}
                  />
                ))}
              </g>
            );
          })}
  
          <text
            x={padding.left + graphWidth / 2}
            y={padding.top + graphHeight + 45}
            fill="#999"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
          >
            Race Progress (%)
          </text>
  
          <text
            x={padding.left - 40}
            y={padding.top + graphHeight / 2}
            fill="#999"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
            transform={`rotate(-90, ${padding.left - 40}, ${padding.top + graphHeight / 2})`}
          >
            {graphMetric === "wpm" ? "Words Per Minute" : graphMetric === "errors" ? "Total Errors" : "Correct Characters"}
          </text>
  
          <rect
            x={padding.left + graphWidth + 20}
            y={padding.top}
            width={100}
            height={sortedResults.length * 32 + 16}
            fill="#1a1a1a"
            rx="8"
          />
          <text
            x={padding.left + graphWidth + 30}
            y={padding.top + 16}
            fill="#999"
            fontSize="12"
            fontWeight="700"
          >
            RACERS
          </text>
  
          {sortedResults.map((player, idx) => (
            <g
              key={player.userId}
              onMouseEnter={() => setHoveredPlayer(player.userId)}
              onMouseLeave={() => setHoveredPlayer(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={padding.left + graphWidth + 20}
                y={padding.top + 24 + idx * 32}
                width={100}
                height={28}
                fill={hoveredPlayer === player.userId ? '#2a2a2a' : 'transparent'}
                rx="4"
              />
              <circle
                cx={padding.left + graphWidth + 30}
                cy={padding.top + 38 + idx * 32}
                r="6"
                fill={getPlayerColor(idx)}
              />
              <text
                x={padding.left + graphWidth + 42}
                y={padding.top + 42 + idx * 32}
                fill="#fff"
                fontSize="11"
                fontWeight="500"
              >
                {player.name.length > 10 ? player.name.substring(0, 10) + '...' : player.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }