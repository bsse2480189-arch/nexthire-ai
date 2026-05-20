import React from "react";

// Line Chart component
interface LineChartProps {
  data: number[];
  labels: string[];
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, labels, height = 150 }) => {
  const max = 100;
  const min = 0;
  const range = max - min;
  
  // Calculate SVG points
  const width = 500;
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 40) + 20;
    const y = height - ((val - min) / range) * (height - 40) - 20;
    return { x, y, val };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - 20} L ${points[0].x} ${height - 20} Z`;

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        <line x1="20" y1={height - 20} x2={width - 20} y2={height - 20} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="20" y1="20" x2={width - 20} y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Fills & Paths */}
        <path d={areaD} fill="url(#chartGradient)" />
        <path d={pathD} fill="none" stroke="url(#primaryGradientDef)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Interactive Dots */}
        {points.map((p, idx) => (
          <g key={idx} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              className="fill-cyan-400 stroke-background-dark stroke-[2px] transition-all duration-200 group-hover:r-6"
            />
            {/* Tooltip on hover */}
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              className="opacity-0 group-hover:opacity-100 fill-white text-[10px] font-mono font-medium transition-opacity duration-200 bg-black/80 px-1 py-0.5 rounded"
            >
              {p.val}%
            </text>
          </g>
        ))}

        {/* X-axis Labels */}
        {labels.map((lbl, idx) => {
          const x = (idx / (labels.length - 1)) * (width - 40) + 20;
          return (
            <text
              key={idx}
              x={x}
              y={height - 4}
              textAnchor="middle"
              className="fill-on-surface-variant text-[10px] font-mono tracking-wider"
            >
              {lbl}
            </text>
          );
        })}

        {/* Gradient Def */}
        <defs>
          <linearGradient id="primaryGradientDef" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Simple Sparkline component
export const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const height = 40;
  const width = 120;
  const max = 100;
  const min = 40;
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 10) + 5;
    const y = height - ((val - min) / (max - min)) * (height - 10) - 5;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke="#06B6D4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx={(width / (data.length - 1)) * (data.length - 1) - 2}
        cy={height - ((data[data.length - 1] - min) / (max - min)) * (height - 10) - 5}
        r="3"
        fill="#06B6D4"
        className="animate-pulse"
      />
    </svg>
  );
};

// Pie Chart (Donut variant) component
interface PieChartProps {
  percentage: number; // e.g., 78 for 78%
  label: string;
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ percentage, label, size = 120 }) => {
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Dynamic Arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="url(#pieGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="pieGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-white leading-none">{percentage}%</span>
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mt-1">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

// Bar Chart component
interface BarChartProps {
  categories: string[];
  values: number[];
}

export const BarChart: React.FC<BarChartProps> = ({ categories, values }) => {
  return (
    <div className="space-y-4 w-full">
      {categories.map((cat, idx) => {
        const val = values[idx];
        return (
          <div key={cat} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface font-medium">{cat}</span>
              <span className="text-brand-accent font-mono font-bold">{val}%</span>
            </div>
            
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
