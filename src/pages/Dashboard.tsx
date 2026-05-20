import React, { useState, useEffect } from "react";
import { 
  Code, Users, Target, BarChart3, Headphones, Search, Bell, Settings, LogOut,
  Calendar, CheckCircle, TrendingUp, Sparkles, MessageSquareCode, Clock, RefreshCw, Star, ArrowRight
} from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/PrimaryButton";
import { LineChart, Sparkline } from "../components/Charts";
import { User, InterviewCategory } from "../types";

// Matching Icon mapping for Lucide
const getIcon = (name: string) => {
  switch (name) {
    case "Code": return <Code className="h-5 w-5" />;
    case "Users": return <Users className="h-5 w-5" />;
    case "Target": return <Target className="h-5 w-5" />;
    case "BarChart3": return <BarChart3 className="h-5 w-5" />;
    case "Headphones": return <Headphones className="h-5 w-5" />;
    default: return <Code className="h-5 w-5" />;
  }
};

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigateToCategory: (categoryId: string) => void;
  history: Array<{
    id: string;
    categoryTitle: string;
    score: number;
    date: string;
    duration: string;
  }>;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onLogout, 
  onNavigateToCategory,
  history
}) => {
  const [categories, setCategories] = useState<InterviewCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic load categories list from full-stack api
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed loading backend categories, static loads initialized.", err);
        // Fallback local structures if API is busy or offline
        setCategories([
          {
            id: "software-engineer",
            title: "Software Engineer",
            description: "Technical coding and software architecture mock assessment",
            iconName: "Code",
            exampleQuestions: []
          },
          {
            id: "hr-behavioral",
            title: "HR Interview",
            description: "Standard behavioral questions focusing on culture fit and core leadership metrics",
            iconName: "Users",
            exampleQuestions: []
          },
          {
            id: "ielts-speaking",
            title: "IELTS Speaking",
            description: "English fluency, pronunciation, grammar, and formal vocabulary exercises",
            iconName: "Target",
            exampleQuestions: []
          },
          {
            id: "business-analyst",
            title: "Business Analyst",
            description: "Requirements gathering, user story definitions, and data-driven strategy sessions",
            iconName: "BarChart3",
            exampleQuestions: []
          },
          {
            id: "customer-support",
            title: "Customer Support",
            description: "Empathy, de-escalation, professional chat support, and ticket triage drills",
            iconName: "Headphones",
            exampleQuestions: []
          }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sparkline data
  const communicationKPIs = [60, 68, 74, 86];
  const confidenceKPIs = [70, 72, 79, 82];
  const grammarKPIs = [65, 78, 80, 85];

  return (
    <div className="min-h-screen flex text-on-surface bg-[#080A14] select-none md:flex-row flex-col overflow-x-hidden relative">
      {/* Background radial overlays */}
      <div className="absolute top-[5%] right-[25%] w-[450px] h-[450px] ai-orb opacity-30 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] ai-orb opacity-20 pointer-events-none" />

      {/* Persistent Sidebar (desktop) / Drawer on mobile */}
      <aside 
        className={`${
          sidebarCollapsed ? "md:w-20" : "md:w-64"
        } w-full md:min-h-screen flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-black/40 backdrop-blur-md px-4 py-5 transition-all duration-300 z-30`}
      >
        <div className="flex md:flex-col w-full gap-8">
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm">
              N
            </div>
            {!sidebarCollapsed && (
              <span className="font-display font-extrabold text-lg tracking-tight text-white md:block hidden animate-fade-in-up">
                NextHire <span className="gradient-text bg-gradient-to-r from-cyan-400 to-[#8B5CF6] bg-clip-text text-transparent">AI</span>
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="md:flex md:flex-col gap-1 w-full hidden">
            <button className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl bg-white/5 text-brand-accent font-medium text-sm transition-all border-l-2 border-brand-accent text-left">
              <TrendingUp className="h-5 w-5" />
              {!sidebarCollapsed && <span className="animate-fade-in-up">Performance Panel</span>}
            </button>
            <button className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-on-surface-variant hover:text-white font-medium text-sm transition-all text-left">
              <Calendar className="h-5 w-5" />
              {!sidebarCollapsed && <span className="animate-fade-in-up">Upcoming Blocks</span>}
            </button>
            <button className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-on-surface-variant hover:text-white font-medium text-sm transition-all text-left">
              <Settings className="h-5 w-5" />
              {!sidebarCollapsed && <span className="animate-fade-in-up">Settings Menu</span>}
            </button>
          </nav>
        </div>

        {/* User profile actions at base */}
        <div className="flex md:flex-col gap-3 items-center md:items-stretch w-fit md:w-full">
          {!sidebarCollapsed && (
            <div className="md:flex hidden items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 mb-2">
              <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-400/20">
                AR
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white tracking-tight">{user.name}</p>
                <span className="text-[10px] text-on-surface-variant font-mono">candidate level</span>
              </div>
            </div>
          )}
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-on-surface-variant hover:text-red-400 font-medium text-sm transition-all text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="md:inline hidden">Sign Out Profile</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen">
        
        {/* Topbar */}
        <header className="flex justify-between items-center py-4 px-6 md:px-8 border-b border-white/5 bg-black/10 select-none">
          <div className="relative w-full max-w-sm md:block hidden">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mock interview categories..."
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-brand-accent focus:outline-none focus:bg-white/10 transition-all"
            />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
              N
            </div>
            <span className="font-display font-medium text-white text-sm">NextHire AI</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-full border border-white/5 hover:bg-white/5 text-on-surface-variant hover:text-white transition-all cursor-pointer relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            <div className="h-8 w-8 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center font-bold text-xs border border-brand-accent/30 select-none">
              {user.name.split(" ").map(w => w[0]).join("")}
            </div>
          </div>
        </header>

        {/* Core Body Container */}
        <div className="flex-grow p-6 md:p-8 space-y-8 overflow-y-auto">
          
          {/* Welcome Dashboard Intro */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4 border-b border-white/5 text-left">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Connect your microphone below to launch a dynamic mock session. View real-time feedback updates instantly.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigateToCategory("software-engineer")}
                className="btn-primary-gradient px-4.5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Quick Mock Start
              </button>
            </div>
          </div>

          {/* KPI Analytics Block & Score trend Line */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Historical Progress Line Graph */}
            <GlassCard className="lg:col-span-2 space-y-4 text-left border-t-white/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-semibold block">Historic Progress Graph</span>
                    <h3 className="text-lg font-semibold text-white">Aggregated Performance Trend</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-teal-400/10 text-teal-400 text-[10px] font-mono font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +14.5% OVERALL STREAK
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant mb-4">
                  Evaluated across your last 4 mock sessions. Practice regularly to reduce grammatical errors.
                </p>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                {history && history.length > 0 ? (
                  <LineChart 
                    data={history.map(h => h.score)} 
                    labels={history.map(h => h.date)} 
                    height={160} 
                  />
                ) : (
                  <LineChart 
                    data={[68, 73, 76, 84]} 
                    labels={["Session 1", "Session 2", "Session 3", "Session 4"]} 
                    height={160} 
                  />
                )}
              </div>
            </GlassCard>

            {/* AI Sparkline Breakdown Parameters */}
            <GlassCard className="space-y-6 text-left flex flex-col justify-between border-t-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-semibold block">Instant KPI Metrics</span>
                <h3 className="text-lg font-semibold text-white">Continuous AI Scores</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Evaluations generated automatically using real voice transcripts.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-xs text-on-surface-variant uppercase font-mono tracking-wide">Communication</span>
                    <p className="text-sm font-bold text-white font-mono">86%</p>
                  </div>
                  <Sparkline data={communicationKPIs} />
                </div>
                
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-xs text-on-surface-variant uppercase font-mono tracking-wide">Confidence</span>
                    <p className="text-sm font-bold text-white font-mono">82%</p>
                  </div>
                  <Sparkline data={confidenceKPIs} />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-xs text-on-surface-variant uppercase font-mono tracking-wide">Grammar</span>
                    <p className="text-sm font-bold text-white font-mono">85%</p>
                  </div>
                  <Sparkline data={grammarKPIs} />
                </div>
              </div>
            </GlassCard>
            
          </div>

          {/* Job Categories Panel */}
          <div className="space-y-5">
            <div className="text-left">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Select Job Category to Begin Practice</h2>
              <p className="text-xs text-slate-400 mt-1.5">
                Each job category contains unique, high-fidelity mock sequences curated or dynamically evaluated by the AI.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-44 rounded-2xl bg-white/5 animate-pulse border border-white/15" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((catStringObj) => (
                  <div 
                    key={catStringObj.id}
                    onClick={() => onNavigateToCategory(catStringObj.id)}
                    className="group"
                  >
                    <GlassCard 
                      hoverEffect={true} 
                      className="cursor-pointer h-full border-t-white/10 flex flex-col justify-between text-left group-hover:border-indigo-500/35 transition-all duration-300 p-6 min-h-[175px]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-brand-accent border border-indigo-400/10">
                            {getIcon(catStringObj.iconName)}
                          </div>
                          
                          <span className="h-5 w-5 rounded-full bg-white/5 text-on-surface-variant hover:text-white flex items-center justify-center text-xs group-hover:bg-brand-accent/25 group-hover:text-brand-accent transition-all duration-300">
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <div>
                          <h3 className="font-semibold text-base text-white group-hover:text-brand-accent transition-colors">
                            {catStringObj.title}
                          </h3>
                          <p className="text-xs text-on-surface-variant leading-relaxed mt-1 line-clamp-2">
                            {catStringObj.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-on-surface-variant font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~5 minutes length
                        </span>
                        <span className="flex items-center gap-1 text-brand-accent font-semibold">
                          <Sparkles className="h-3 w-3" />
                          AI Active
                        </span>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick lists (Upcoming or Recent historic records) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* Upcoming block schedules */}
            <GlassCard className="text-left space-y-4 border-t-white/10">
              <h3 className="font-semibold text-base text-white flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-indigo-400" />
                Upcoming Live Mock Blocks
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/15 border border-white/5 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-white">Fullstack Engineer Mock Review</p>
                    <p className="text-on-surface-variant text-[10px]">With Advisor Sarah Jenkins</p>
                  </div>
                  <span className="text-brand-accent font-mono font-medium">Tomorrow, 10:00 AM</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/15 border border-white/5 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-white">IELTS Pronunciation Level 3</p>
                    <p className="text-on-surface-variant text-[10px]">Pacing & Sentence Breaks</p>
                  </div>
                  <span className="text-on-surface-variant font-mono font-medium">Friday, 2:30 PM</span>
                </div>
              </div>
            </GlassCard>

            {/* Historical reports list */}
            <GlassCard className="text-left space-y-4 border-t-white/10">
              <h3 className="font-semibold text-base text-white flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-teal-400" />
                Recent Practice Reports
              </h3>

              <div className="space-y-3.5">
                {history && history.length > 0 ? (
                  history.slice(0, 2).map((h, i) => (
                    <div key={h.id || i} className="flex items-center justify-between p-3.5 rounded-xl bg-black/15 border border-white/15 text-xs">
                      <div>
                        <p className="font-bold text-white">{h.categoryTitle}</p>
                        <p className="text-on-surface-variant text-[10px]">Evaluated: {h.date} &middot; {h.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 text-sm">{h.score}%</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/15 border border-white/5 text-xs">
                      <div>
                        <p className="font-bold text-white">HR Interview Behavioral Session</p>
                        <p className="text-on-surface-variant text-[10px]">Evaluated: 2026-05-18 &middot; 4 mins duration</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 text-sm">84%</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/15 border border-white/5 text-xs">
                      <div>
                        <p className="font-bold text-white">Customer Support Drill</p>
                        <p className="text-on-surface-variant text-[10px]">Evaluated: 2026-05-15 &middot; 5 mins duration</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400 text-sm">76%</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </GlassCard>

          </div>
          
        </div>
      </div>
    </div>
  );
};
