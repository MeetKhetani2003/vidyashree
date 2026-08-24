"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { IconArrowRight } from "@/components/icons";

type Testimonial = {
  name: string;
  date: string;
  rating: number;
  reviewCount: number;
  status: { text: string; type: string };
  tags: string[];
  quote: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
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
      className="relative max-w-2xl mx-auto mt-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden relative pb-6">
        <div 
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-2 md:px-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-4 h-full min-h-[220px]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {testimonial.avatar ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 opacity-50"></div>
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0 ${testimonial.initialBg || 'bg-green-600'}`}>
                        {testimonial.initial || testimonial.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <h4 className="text-slate-900 font-medium text-lg leading-tight">{testimonial.name}</h4>
                      <span className="text-slate-500 text-sm">{testimonial.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">{testimonial.date}</span>
                      <span className="text-slate-400 text-sm">•</span>
                      <div className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        {testimonial.rating.toFixed(1)} <Star size={10} fill="currentColor" strokeWidth={0} />
                      </div>
                    </div>
                    
                    {testimonial.status.type === 'pending' ? (
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                        {testimonial.status.text}
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                        {testimonial.status.text}
                      </div>
                    )}
                  </div>
                </div>

                {testimonial.tags && testimonial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {testimonial.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 text-slate-600 text-sm bg-white">
                        {tag !== '+ 1' && <span className="text-green-500 text-xs">👍</span>} {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-slate-700 mt-2 text-base leading-relaxed line-clamp-4">
                  {testimonial.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-6">
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
