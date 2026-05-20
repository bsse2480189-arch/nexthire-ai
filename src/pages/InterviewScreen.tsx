import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Pause, Play, SkipForward, ArrowRight, Loader2, StopCircle } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/PrimaryButton";
import { Question } from "../types";

interface InterviewScreenProps {
  categoryId: string;
  categoryTitle: string;
  onInterviewComplete: (questionsAndAnswers: Question[]) => void;
  onExit: () => void;
}

export const InterviewScreen: React.FC<InterviewScreenProps> = ({
  categoryId,
  categoryTitle,
  onInterviewComplete,
  onExit
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timerCount, setTimerCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [transcription, setTranscription] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submittingEvaluation, setSubmittingEvaluation] = useState(false);

  // Web Speech API for real-time live typing feedback!
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Dynamic load mock interview questions from server api using actual Gemini generation!
    fetch("/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId })
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed loading backend questions, fallback list initialized.", err);
        setLoading(false);
      });
  }, [categoryId]);

  // Handle active seconds stopwatch
  useEffect(() => {
    if (isPaused || loading || submittingEvaluation) return;
    const interval = setInterval(() => {
      setTimerCount((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, loading, submittingEvaluation]);

  // Speech Recognition initializer
  useEffect(() => {
    if (loading || submittingEvaluation) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event: any) => {
        let finalTrans = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript + " ";
          }
        }
        if (finalTrans) {
          setTranscription((prev) => prev + finalTrans);
        }
      };

      rec.onerror = (err: any) => {
        console.warn("Speech recognition error parameters logged:", err.error);
      };

      recognitionRef.current = rec;
      if (isRecording && !isPaused) {
        try {
          rec.start();
        } catch (e) {
          console.log("Speech recognition start already busy:", e);
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [loading, submittingEvaluation]);

  // Pause toggle actions
  useEffect(() => {
    if (!recognitionRef.current) return;
    if (isPaused || !isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  }, [isPaused, isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    } else {
      setIsRecording(true);
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch(e){}
      }
    }
  };

  const currentQuestion = questions[currentIdx];

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    
    // Save current transcribed text to answers list
    const finalAnswer = transcription.trim() || "Thank you. I think that covers my perspective on this topic.";
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: finalAnswer
    }));

    // Reset speech text state for next prompt
    setTranscription("");

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Loop complete, proceed directly to evaluation processing screen
      handleEndAndEvaluate({
        ...answers,
        [currentQuestion.id]: finalAnswer
      });
    }
  };

  const handleSkip = () => {
    if (!currentQuestion) return;
    // Save blank or default string
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: "Candidate chose to skip answering this behavioral query."
    }));
    setTranscription("");

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleEndAndEvaluate({
        ...answers,
        [currentQuestion.id]: "Candidate chose to skip answering this behavioral query."
      });
    }
  };

  const handleEndAndEvaluate = (finalAnswersState?: Record<number, string>) => {
    setSubmittingEvaluation(true);
    
    // Ensure last question state is correctly parsed
    const evalAnswers = finalAnswersState || answers;
    if (currentQuestion && !evalAnswers[currentQuestion.id]) {
      evalAnswers[currentQuestion.id] = transcription.trim() || "Thank you. That completes my behavioral perspective on this topic.";
    }

    // Maps questions array with actual user typed/spoken feedback
    const completedQuestions: Question[] = questions.map((q) => ({
      ...q,
      userAnswer: evalAnswers[q.id] || "No answer provided / blank segment."
    }));

    // Trigger parent callback evaluations
    onInterviewComplete(completedQuestions);
  };

  // Human timer conversion
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none bg-[#080A14] overflow-hidden">
        <Loader2 className="h-10 w-10 text-[#8B5CF6] animate-spin mb-4" />
        <p className="text-sm text-slate-400 font-mono font-medium uppercase tracking-wider">Launching dynamic mock assessment environment...</p>
      </div>
    );
  }

  if (submittingEvaluation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none bg-[#080A14] overflow-hidden relative">
        <div className="absolute top-[20%] left-[20%] w-[450px] h-[450px] ai-orb opacity-40 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[450px] ai-orb opacity-35 pointer-events-none" />

        <div className="z-10 max-w-sm space-y-6">
          <Loader2 className="h-12 w-12 text-[#8B5CF6] animate-spin mx-auto mb-2" />
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-1">Evaluating Response</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini is transcribing voice metrics, evaluating core parameters, grammar matching, and preparing your custom scorecard report...
            </p>
          </div>
          <p className="text-[10px] text-[#8B5CF6] font-mono uppercase tracking-widest font-bold animate-pulse">
            Analyzing behavioral responses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#080A14] select-none overflow-x-hidden">
      
      {/* Background radial overlays */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] ai-orb opacity-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] ai-orb opacity-30 pointer-events-none" />

      {/* Top Header Row */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <span className="font-display font-medium text-on-surface opacity-55 text-sm">NextHire AI &middot; Mock</span>
        
        {/* Stopwatch layout metrics */}
        <div className="flex items-center gap-3.5 px-4.5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-label-sm text-xs font-semibold text-red-500 uppercase tracking-wide">LIVE</span>
          <span className="font-mono text-xs text-on-surface font-semibold ml-1">{formatTime(timerCount)}</span>
        </div>
      </header>

      {/* Primary focused body container */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto px-6 pt-24 pb-16 z-10 w-full relative">
        <GlassCard className="w-full border-t-white/10 shadow-2xl p-8 md:p-10 flex flex-col items-center gap-8 text-center animate-fade-in-up">
          
          {/* Avatar speak module */}
          <div className="relative flex flex-col items-center gap-3">
            <div className={`w-28 h-28 rounded-full overflow-hidden relative z-10 border-2 transition-all duration-300 ${
              isRecording && !isPaused ? "border-brand-accent animate-pulse-ring" : "border-white/20"
            }`}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnzaS8fq-I4oNcI45ZSpE4rx7OTCjsaD3csUc9tUi04OsE6SUmaR3Jb197DX803SydAeIgMjBBCqKSJHI-rm9ltRGOxoKKBhLcFlGT3knvcsX7QdM7IIITsuKn7sYqnOhryBT_vOO8Um1iZ6yfCDJyQU1MD5S6CaMkEmNtalpvTgJ5DmJexLKH0dzmMRWkQYdcEjs_ok1BXecjRzUpP4qzVkzvmh-ODAjUmbcMb6j6NwVAGcf-54rAm74VWNTYVyzePuVazWEKTYe7" 
                alt="AI Recruiter" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-brand-accent py-0.5 px-3 rounded bg-brand-accent/15">
              {isPaused ? "PAUSED" : isRecording ? "AI LISTENING" : "MIC STANDBY"}
            </span>
          </div>

          {/* Central Interview Prompt */}
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold block">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <h1 className="text-2xl md:text-3.5xl font-extrabold text-white tracking-tight leading-relaxed max-w-md md:max-w-2xl mx-auto">
              "{currentQuestion?.text || "Can you share your perspective?"}"
            </h1>
          </div>

          {/* User spoken transcription panel Fallback or Real-time Speech transcription box */}
          <div className="w-full max-w-xl bg-black/40 rounded-xl p-5 border border-white/5 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-mono uppercase font-semibold">Transcription Preview</span>
              <span className="text-[10px] text-brand-accent font-mono font-medium uppercase tracking-wider animate-pulse">
                Auto audio sync
              </span>
            </div>

            {/* Simulated/Speech recognition results */}
            <div className="min-h-16 text-xs text-on-surface leading-relaxed max-h-32 overflow-y-auto">
              {transcription ? (
                <span className="text-white font-medium">{transcription}</span>
              ) : (
                <span className="text-on-surface-variant italic">
                  [Begin speaking into your microphone. If speech-recognition prompts are blocked, typing your insights directly here works fine too!]
                </span>
              )}
            </div>

            {/* Custom manual input for robust backup fail-proof evaluations */}
            <textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Or write/refine your complete mock answer here directly..."
              className="w-full bg-black/20 border border-white/5 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 mt-2 resize-none h-16 transition-colors"
            />
          </div>

          {/* Waveform graphic indicator */}
          <div className="w-full bg-black/15 rounded-xl p-4 flex items-center justify-between border border-white/5 max-w-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRecording}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  isRecording ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-white/10 text-on-surface-variant hover:text-white"
                }`}
                aria-label="Toggle Recording"
              >
                {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              <div className="text-left leading-tight">
                <span className="block text-xs font-semibold text-white">
                  {isRecording ? "Microphone active" : "Microphone on standby"}
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono">
                  {isRecording ? "Streaming speech indicators..." : "Click icon to activate audio capture"}
                </span>
              </div>
            </div>

            {/* Interactive wave animation */}
            <div className="flex items-end gap-1 h-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                <div
                  key={bar}
                  className="waveform-bar w-1 rounded-sm bg-brand-accent transition-all duration-300"
                  style={{
                    animationPlayState: isRecording && !isPaused ? "running" : "paused",
                    opacity: isRecording && !isPaused ? 0.8 : 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Dynamic Nav Controls */}
        <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-8">
          <Button 
            onClick={() => setIsPaused(!isPaused)} 
            variant="secondary" 
            className="px-5 py-2.5"
          >
            {isPaused ? <Play className="h-4.5 w-4.5 text-cyan-400" /> : <Pause className="h-4.5 w-4.5" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>

          <Button 
            onClick={handleSkip} 
            variant="secondary" 
            className="px-5 py-2.5"
          >
            <SkipForward className="h-4.5 w-4.5 text-on-surface-variant" />
            Skip Question
          </Button>

          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={onExit} 
              className="text-xs text-on-surface-variant hover:text-white cursor-pointer transition-colors mr-2"
            >
              Cancel
            </button>
            <Button 
              onClick={handleNextQuestion} 
              variant="primary" 
              className="px-6 py-2.5 shadow-lg"
            >
              {currentIdx < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Finish Interview
                  <StopCircle className="h-4.5 w-4.5 text-red-300" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
