import React, { useState } from "react";
import { Eye, EyeOff, Mail, Key, ShieldCheck, ArrowRight, CornerDownLeft, X, CheckCircle } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/PrimaryButton";
import { User } from "../types";

interface AuthenticationProps {
  onLoginSuccess: (user: User) => void;
  onNavigateHome: () => void;
}

export const Authentication: React.FC<AuthenticationProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("candidate@nexthire.ai");
  const [password, setPassword] = useState("democdid123");
  const [name, setName] = useState("Alex Rivers");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Password reset state hooks
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) {
      setErrorMsg("Please populate all credential requirements correctly.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // Dynamic mock authentications
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email: email,
        name: isSignUp ? name : "Alex Rivers",
        isAuthenticated: true
      });
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email: "google.candidate@nexthire.ai",
        name: "Google Candidate",
        isAuthenticated: true
      });
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetError("Please provide a valid email address.");
      return;
    }
    setResetLoading(true);
    setResetError(null);

    // Simulated network propagation for password restore instructions
    setTimeout(() => {
      setResetLoading(false);
      setResetSuccess(true);
    }, 1200);
  };

  const handleCloseResetModal = () => {
    setShowResetModal(false);
    setResetEmail("");
    setResetSuccess(false);
    setResetError(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 select-none bg-[#080A14] overflow-hidden">
      {/* Background Lighting blur */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] ai-orb opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] ai-orb opacity-25 pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        {/* Minimal back to home button */}
        <button 
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-white mb-2 cursor-pointer transition-colors font-medium"
        >
          <CornerDownLeft className="h-4 w-4 text-[#8B5CF6]" />
          Back to homepage
        </button>

        <GlassCard className="border-t-white/10 p-8 shadow-2xl relative">
          <div className="text-center mb-8 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center font-bold text-white text-lg mx-auto mb-3 shadow-md">
              N
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isSignUp ? "Create profile" : "Sign In"}
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isSignUp ? "Unlock unlimited mock practice runs instantly" : "Welcome back. Let's practice with world-class feedback."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1 text-left">
                <label htmlFor="name-input" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <ShieldCheck className="h-4 h-4" />
                  </span>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivers"
                    className="w-full bg-black/35 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1 text-left">
              <label htmlFor="email-input" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Work Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@nexthire.ai"
                  className="w-full bg-black/35 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:border-brand-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <div className="flex justify-between items-center">
                <label htmlFor="password-input" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Secure Password
                </label>
                {!isSignUp && (
                  <button 
                    type="button"
                    onClick={() => {
                      setResetEmail(email); // Autofill with user entered email if present
                      setShowResetModal(true);
                    }}
                    className="text-xs text-brand-accent hover:underline cursor-pointer focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  <Key className="h-4 w-4" />
                </span>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/35 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-white/30 focus:border-brand-accent focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember me trigger */}
            {!isSignUp && (
              <div className="flex items-center gap-2 pt-1 text-left select-none">
                <input 
                  type="checkbox" 
                  id="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded bg-black/40 border-white/20 text-indigo-500 focus:ring-brand-accent focus:ring-offset-0 focus:outline-none"
                />
                <label htmlFor="remember-me" className="text-xs text-on-surface-variant cursor-pointer">
                  Remember my session active
                </label>
              </div>
            )}

            {/* Error logs */}
            {errorMsg && (
              <div aria-live="polite" className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-left">
                {errorMsg}
              </div>
            )}

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3.5 text-sm mt-4 gradient-btn rounded-full font-bold flex items-center justify-center gap-1.5 border-transparent">
              {isSignUp ? "Sign Up Now" : "Sign in to Dashboard"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Social Sep */}
          <div className="relative flex py-5 items-center justify-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] text-on-surface-variant uppercase tracking-wider font-mono font-bold">Or secure alternative</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-3 text-sm font-medium text-white shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {/* Google Vector Icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.215 1.632 15.485 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24z"
              />
            </svg>
            Sign in with Google Sync
          </button>

          {/* OTP Note */}
          <p className="text-[10px] text-on-surface-variant mt-4 font-mono text-center">
            * One-Time Passcode (OTP) options will trigger automatically on unknown devices.
          </p>
        </GlassCard>

        {/* Form mode triggers */}
        <p className="text-sm text-on-surface-variant text-center select-none">
          {isSignUp ? "Already have a candidate profile?" : "New to assessment screens?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
            }}
            className="text-brand-accent font-semibold hover:underline cursor-pointer"
          >
            {isSignUp ? "Sign In Here" : "Create Account Free"}
          </button>
        </p>
      </div>

      {/* Password Recovery Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md">
            <GlassCard className="border-t-white/10 p-8 shadow-2xl relative select-none text-left">
              <button
                type="button"
                onClick={handleCloseResetModal}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {!resetSuccess ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center font-bold text-white text-lg mx-auto shadow-md">
                      <Key className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Recover Password</h2>
                    <p className="text-xs text-slate-400">
                      Provide your registered email address to receive password retrieval steps instructions.
                    </p>
                  </div>

                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="reset-email" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input
                          id="reset-email"
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="candidate@nexthire.ai"
                          className="w-full bg-black/35 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:border-brand-accent focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {resetError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                        {resetError}
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseResetModal}
                        className="flex-1 py-3 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <Button
                        type="submit"
                        variant="primary"
                        loading={resetLoading}
                        className="flex-1 py-3 text-xs gradient-btn rounded-full font-bold flex items-center justify-center gap-1.5 border-transparent"
                      >
                        Reset Password
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-6 py-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-extrabold text-white tracking-tight">Instructions Dispatched</h2>
                    <p className="text-xs text-slate-400 px-2 leading-relaxed">
                      We've transmitted password restoration instructions to <span className="text-white font-medium">{resetEmail}</span>. Please verify your spam folder if the email is not received shortly.
                    </p>
                  </div>
                  <Button
                    onClick={handleCloseResetModal}
                    variant="primary"
                    className="w-full py-3.5 text-xs gradient-btn rounded-full font-bold border-transparent"
                  >
                    Return to login
                  </Button>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};
