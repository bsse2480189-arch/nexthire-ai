import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { GlassCard } from "./GlassCard";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "NextHire AI was the single best tool in my job search. The behavioral feedback allowed me to trace and remove redundant conversational filler statements. I landed my Staff Architect position within four weeks of practice!",
    name: "Sarah Jenkins",
    role: "Staff Software Engineer",
    company: "Vercel"
  },
  {
    id: 2,
    quote: "The IELTS English speaking simulator is incredibly accurate. It analyzed my pronunciation pacing, vocabulary choices, and grammar in real-time, giving me scores that perfectly predicted my actual exam results.",
    name: "Hiroshi Sato",
    role: "MBA Candidate",
    company: "Stanford University"
  },
  {
    id: 3,
    quote: "Our recruiting team utilizes NextHire to screen candidate confidence parameters and technical vocabulary alignments. It has cut down average preliminary interview times by 40% while raising quality of placement.",
    name: "Elena Rostova",
    role: "Director of Talent Acquisition",
    company: "Stripe"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <GlassCard className="w-full" hoverEffect={true}>
      <div className="flex flex-col items-center text-center px-4 py-6 relative">
        <div className="absolute top-0 opacity-10 text-brand-accent">
          <Quote className="h-12 w-12" />
        </div>
        
        <p className="text-lg md:text-xl text-on-surface italic font-light max-w-2xl leading-relaxed mb-6">
          "{TESTIMONIALS[activeIndex].quote}"
        </p>

        <div className="flex flex-col items-center">
          <p className="font-semibold text-white text-base">
            {TESTIMONIALS[activeIndex].name}
          </p>
          <p className="text-sm text-on-surface-variant">
            {TESTIMONIALS[activeIndex].role} &middot; <span className="text-brand-accent">{TESTIMONIALS[activeIndex].company}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-on-surface-variant hover:text-white" />
          </button>
          
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === activeIndex ? "w-6 bg-brand-accent" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-on-surface-variant hover:text-white" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
