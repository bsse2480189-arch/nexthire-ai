import React from "react";
import { Mic, BarChart2, MessageSquare, Zap, Play, ChevronRight, CheckCircle2, Award } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/PrimaryButton";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { PricingView } from "../components/PricingCard";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <div className="relative min-h-screen bg-[#080A14] overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] ai-orb opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] ai-orb opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-10 py-6 px-6 lg:px-12 flex justify-between items-center select-none border-b border-white/5 bg-background-dark/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-md">
            N
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">NextHire <span className="text-brand-accent">AI</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm text-on-surface-variant">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("login")} 
            className="text-sm font-medium text-on-surface hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <Button onClick={() => onNavigate("login")} variant="primary" className="shadow-lg">
            Start Free
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-5">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 relative">
          <div className="col-span-1 lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">New: System v2.0 Released</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white tracking-tight leading-[1.05] mb-6">
              Practice Interviews <br />
              <span className="gradient-text bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">with AI Confidence.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Improve your confidence, communication, and job readiness using AI-powered mock interviews. Instant feedback, real-time analytics.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => onNavigate("login")} variant="primary" className="px-10 py-4 text-base shadow-xl group gradient-btn rounded-full font-bold">
                Start Interview
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <button 
                onClick={() => onNavigate("login")}
                className="glass-surface px-10 py-4 rounded-full text-base font-semibold border border-white/20 hover:bg-white/5 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2.5"
              >
                <Play className="h-4 w-4 text-brand-accent fill-brand-accent/20" />
                Watch Demo
              </button>
            </div>

            <div className="mt-16 flex items-center gap-10">
              <div>
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Active Users</div>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Success Rate</div>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div>
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Role Templates</div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 relative">
            {/* Glass Card Interview Mockup */}
            <div className="glass-surface rounded-3xl p-6 shadow-2xl relative z-20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnzaS8fq-I4oNcI45ZSpE4rx7OTCjsaD3csUc9tUi04OsE6SUmaR3Jb197DX803SydAeIgMjBBCqKSJHI-rm9ltRGOxoKKBhLcFlGT3knvcsX7QdM7IIITsuKn7sYqnOhryBT_vOO8Um1iZ6yfCDJyQU1MD5S6CaMkEmNtalpvTgJ5DmJexLKH0dzmMRWkQYdcEjs_ok1BXecjRzUpP4qzVkzvmh-ODAjUmbcMb6j6NwVAGcf-54rAm74VWNTYVyzePuVazWEKTYe7" 
                      alt="AI Interviewer" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">Ava • AI Recruiter</div>
                    <div className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Listening...
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500">08:42</div>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-sm text-slate-300 italic">"Can you tell me about a time you had to handle a difficult stakeholder when implementing complex code?"</p>
                </div>
                <div className="flex justify-center py-6">
                  <div className="flex items-end gap-1.5 h-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => (
                      <div 
                        key={bar} 
                        className="w-1 bg-[#8B5CF6] rounded-full animate-pulse"
                        style={{
                          height: `${[16, 32, 48, 24, 40, 16, 44, 28, 36, 20, 32, 12][bar - 1]}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-surface p-3 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-slate-500 font-mono">Confidence</div>
                  <div className="text-lg font-bold text-green-400 font-mono">89%</div>
                </div>
                <div className="glass-surface p-3 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-slate-500 font-mono">Vocabulary</div>
                  <div className="text-lg font-bold text-indigo-400 font-mono">Adv.</div>
                </div>
              </div>
            </div>

            {/* Decorative Background Circle */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-3xl rounded-full z-10 pointer-events-none"></div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-20 border-t border-white/5 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">SaaS Engine Features</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Engineered for absolute placement success
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant">
              Every practice drill evaluates response structures, psychological indicators, pacing, and grammatical syntax instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard hoverEffect={true} className="space-y-4 text-left">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit">
                <Mic className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Voice Interview</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Connect your microphone to experience real-time conversational streaming, pacing records, and direct question loops.
              </p>
            </GlassCard>

            <GlassCard hoverEffect={true} className="space-y-4 text-left">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Feedback</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Receive overall and metrics-based analytical reports using robust, top-tier AI modeling with no delays.
              </p>
            </GlassCard>

            <GlassCard hoverEffect={true} className="space-y-4 text-left">
              <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl w-fit">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Real-time Questions</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Participate in dynamic sequences designed to adapt immediately based on your previous technological responses.
              </p>
            </GlassCard>

            <GlassCard hoverEffect={true} className="space-y-4 text-left">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Performance Analytics</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Analyze key historical metrics and trends, grammar breakdown categories, and actionable improvement sample scripts.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Empowering Professionals</span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">What our candidates say</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel />
          </div>
        </section>

        {/* Pricing View */}
        <section id="pricing" className="py-20 border-t border-white/5 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-semibold block">Flat Pricing</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Invest in your future salary
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant">
              Start with free credits, upgrade when you are ready to apply to elite roles.
            </p>
          </div>
          
          <PricingView onPlanSelect={() => onNavigate("login")} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/60 py-12 px-6 text-on-surface-variant text-sm relative z-5 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
              N
            </div>
            <span className="font-display font-medium text-white">NextHire AI</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:support@nexthire.ai" className="hover:text-white transition-colors">Contact Support</a>
          </div>

          <p className="text-xs">&copy; 2026 NextHire AI. Crafted for elite career readiness.</p>
        </div>
      </footer>
    </div>
  );
};
