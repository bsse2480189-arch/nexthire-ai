export interface User {
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface InterviewCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
  exampleQuestions: string[];
}

export interface Question {
  id: number;
  text: string;
  category: string;
  userAnswer?: string;
}

export interface FeedbackReport {
  overallScore: number;
  scores: {
    communication: number;
    confidence: number;
    grammar: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: {
    tips: string;
    sampleResponse: string;
  }[];
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface InterviewSession {
  id: string;
  category: string;
  questions: Question[];
  currentQuestionIndex: number;
  status: 'idle' | 'speaking' | 'listening' | 'paused' | 'evaluating';
  timerSeconds: number;
}
