import React, { useState, useEffect } from "react";
import { User, FeedbackReport, Question } from "./types";
import { LandingPage } from "./pages/LandingPage";
import { Authentication } from "./pages/Authentication";
import { Dashboard } from "./pages/Dashboard";
import { InterviewScreen } from "./pages/InterviewScreen";
import { FeedbackPage } from "./pages/FeedbackPage";

type Screen = "landing" | "login" | "dashboard" | "interview" | "feedback";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; title: string } | null>(null);
  const [report, setReport] = useState<FeedbackReport | null>(null);
  
  // Historical sessions state
  const [history, setHistory] = useState<Array<{
    id: string;
    categoryTitle: string;
    score: number;
    date: string;
    duration: string;
  }>>([
    {
      id: "hist_1",
      categoryTitle: "HR Interview",
      score: 84,
      date: "2026-05-18",
      duration: "4 mins 12 secs"
    },
    {
      id: "hist_2",
      categoryTitle: "Customer Support",
      score: 76,
      date: "2026-05-15",
      duration: "5 mins 01 sec"
    }
  ]);

  // Load user session from local state if available
  useEffect(() => {
    const cachedUser = localStorage.getItem("user_session");
    if (cachedUser) {
      try {
        const u = JSON.parse(cachedUser);
        setUser(u);
        setCurrentScreen("dashboard");
      } catch (e) {}
    }
  }, []);

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem("user_session", JSON.stringify(authenticatedUser));
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
    setCurrentScreen("landing");
  };

  const handleSelectCategory = (categoryId: string) => {
    const titles: Record<string, string> = {
      "software-engineer": "Software Engineer Assessment",
      "hr-behavioral": "HR Interview Behavioral",
      "ielts-speaking": "IELTS Speaking Assessment",
      "business-analyst": "Business Analyst Assessment",
      "customer-support": "Customer Support Drill"
    };

    setSelectedCategory({
      id: categoryId,
      title: titles[categoryId] || "Custom Mock Interview"
    });
    
    // Auto redirect to login if not authenticated
    if (!user) {
      setCurrentScreen("login");
    } else {
      setCurrentScreen("interview");
    }
  };

  const handleInterviewComplete = async (completedQuestions: Question[]) => {
    if (!selectedCategory) return;
    
    try {
      // Trigger full server-side dynamic Gemini AI assessment evaluation!
      const res = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryTitle: selectedCategory.title,
          questions: completedQuestions
        })
      });

      const feedbackData: FeedbackReport = await res.json();
      setReport(feedbackData);

      // Record this session run into history list dynamically
      const newHistoryItem = {
        id: "hist_" + Date.now(),
        categoryTitle: selectedCategory.title,
        score: feedbackData.overallScore,
        date: new Date().toISOString().split("T")[0],
        duration: "5 mins"
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (err) {
      console.error("Evaluation submission failed, fallback initialized:", err);
      setReport(null); // Fallback content will auto toggle inside component
    }

    setCurrentScreen("feedback");
  };

  const handleResetPractice = () => {
    setSelectedCategory(null);
    setReport(null);
    setCurrentScreen("dashboard");
  };

  // Screen router render
  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return (
          <LandingPage 
            onNavigate={setCurrentScreen} 
            onSelectCategory={handleSelectCategory} 
          />
        );
      case "login":
        return (
          <Authentication 
            onLoginSuccess={handleLoginSuccess} 
            onNavigateHome={() => setCurrentScreen("landing")} 
          />
        );
      case "dashboard":
        if (!user) {
          setCurrentScreen("landing");
          return null;
        }
        return (
          <Dashboard 
            user={user} 
            history={history}
            onLogout={handleLogout} 
            onNavigateToCategory={handleSelectCategory} 
          />
        );
      case "interview":
        if (!selectedCategory) {
          setCurrentScreen("dashboard");
          return null;
        }
        return (
          <InterviewScreen 
            categoryId={selectedCategory.id}
            categoryTitle={selectedCategory.title}
            onInterviewComplete={handleInterviewComplete}
            onExit={() => setCurrentScreen("dashboard")}
          />
        );
      case "feedback":
        return (
          <FeedbackPage 
            categoryTitle={selectedCategory?.title || "Mock Interview"}
            report={report}
            onRestart={handleResetPractice}
            onGoToDashboard={() => setCurrentScreen("dashboard")}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentScreen} onSelectCategory={handleSelectCategory} />;
    }
  };

  return (
    <div className="w-full min-h-screen text-center bg-background-dark font-sans text-on-surface antialiased">
      {renderScreen()}
    </div>
  );
}
