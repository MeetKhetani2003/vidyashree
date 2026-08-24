"use client";

import { useState, useEffect, useCallback } from "react";
import { IconArrowRight } from "@/components/icons";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  }, [testimonials.length]);

  const prev = () => {
    setCurrentIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <div 
      className="relative max-w-4xl mx-auto mt-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden relative rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-14 min-h-[300px] flex items-center justify-center">
        <div className="absolute top-8 left-8 text-red-100">
          <svg width="48" height="36" viewBox="0 0 32 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.35824 24C13.8824 24 16 20.3019 16 14.8113V0H0V14.5912C0 19.9874 2.82353 24 9.35824 24ZM25.3582 24C29.8824 24 32 20.3019 32 14.8113V0H16V14.5912C16 19.9874 18.8235 24 25.3582 24Z"/>
          </svg>
        </div>
        
        <div 
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="w-full flex-shrink-0 px-4 md:px-12 flex flex-col justify-center items-center text-center">
              <blockquote className="text-slate-700 text-xl md:text-2xl leading-relaxed mb-8 font-serif z-10">
                “{testimonial.quote}”
              </blockquote>
              <cite className="not-italic flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 text-red-600 font-bold rounded-full flex items-center justify-center text-2xl font-serif border border-red-100 shadow-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold text-lg">{testimonial.name}</strong>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1 block">{testimonial.detail}</span>
                </div>
              </cite>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button 
          onClick={prev}
          className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors rotate-180"
          aria-label="Previous testimonial"
        >
          <IconArrowRight size={18} />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={next}
          className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Next testimonial"
        >
          <IconArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
