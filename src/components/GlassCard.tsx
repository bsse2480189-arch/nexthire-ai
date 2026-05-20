import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  animate = true,
  hoverEffect = false,
}) => {
  return (
    <div
      className={`glass-panel rounded-[20px] p-6 text-on-surface shadow-lg relative overflow-hidden ${
        animate ? "animate-fade-in-up" : ""
      } ${hoverEffect ? "glass-panel-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
