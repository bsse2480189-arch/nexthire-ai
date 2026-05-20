import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = "font-medium text-sm rounded-full px-6 py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 select-none outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2 focus:ring-offset-background-dark";
  
  const variantClasses = {
    primary: "btn-primary-gradient text-white",
    secondary: "border border-white/20 text-on-surface hover:bg-white/5 active:scale-95",
    ghost: "text-on-surface-variant hover:text-on-surface hover:bg-white/5 active:scale-95"
  };

  const disabledClasses = "opacity-55 cursor-not-allowed transform-none pointer-events-none";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabled || loading ? disabledClasses : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
