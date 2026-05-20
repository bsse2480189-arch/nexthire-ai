import React from "react";
import { Check } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./PrimaryButton";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Ideal for basic interview warmups and structural preparation",
    features: [
      "Access to all 5 assessment categories",
      "Standard behavior assessments",
      "3 dynamic interview sessions per month",
      "General communications grading metrics"
    ],
    cta: "Start Practice Basic",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "Engineered for active job seekers needing deep automated evaluation",
    features: [
      "Unlimited dynamic mock interviews",
      "Detailed Gemini AI feedback report",
      "Real-time voice-to-text live speech helper",
      "Custom mock feedback dashboard",
      "Score history tracking and improvement charts",
      "Starred strengths & improvement scripts"
    ],
    cta: "Go Pro Unlimited",
    popular: true
  },
  {
    name: "Team",
    price: "$99",
    period: "month",
    description: "Optimized for bootcamps, agencies, and enterprise recruiter screens",
    features: [
      "Everything in Pro Unlimited plan",
      "Up to 15 team seat invites included",
      "Custom vacancy prompt template creation",
      "Shared talent placement dashboards",
      "API integrations & enterprise webhook notifications",
      "24/7 dedicated support priority queue"
    ],
    cta: "Get NextHire for Team",
    popular: false
  }
];

interface PricingViewProps {
  onPlanSelect: (plan: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onPlanSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {PLANS.map((plan) => (
        <div key={plan.name} className="relative flex flex-col h-full">
          {plan.popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black text-xs font-bold uppercase py-1 px-4 rounded-full tracking-wider z-10 shadow-md">
              Most Popular
            </div>
          )}
          <GlassCard
            className={`flex flex-col h-full justify-between transition-all duration-300 ${
              plan.popular ? "border-brand-accent/50 ring-1 ring-brand-accent/30" : ""
            }`}
            hoverEffect={true}
          >
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed min-h-8">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 my-6">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-on-surface-variant">/{plan.period}</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-sm text-on-surface">
                    <span className="p-0.5 rounded-full bg-brand-accent/10 text-brand-accent mt-0.5 flex-shrink-0">
                      <Check className="h-4.5 w-4.5" />
                    </span>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => onPlanSelect(plan.name)}
              variant={plan.popular ? "primary" : "secondary"}
              className="w-full text-center"
            >
              {plan.cta}
            </Button>
          </GlassCard>
        </div>
      ))}
    </div>
  );
};
