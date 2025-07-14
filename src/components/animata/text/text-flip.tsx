"use client";

import { useEffect, useMemo, useRef } from "react";

export default function TextFlip() {
    const words = useMemo(() => ["insights", "summaries", "translations" ,"downloads", "insights"], []);

  const tallestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tallestRef.current) {
      let maxHeight = 0;

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "absolute opacity-0";
        span.textContent = word;
        tallestRef.current?.appendChild(span);
        const height = span.offsetHeight;
        tallestRef.current?.removeChild(span);

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      tallestRef.current.style.height = `${maxHeight}px`;
    }
  }, [words]);

  return (
    <div className="box-content flex gap-4 text-3xl font-semibold">
      <p className="bg-gradient-to-r from-teal-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-bold drop-shadow-sm">We Offer</p>
      <div ref={tallestRef} className="flex flex-col overflow-hidden text-teal-600">
        {words.map((word, index) => (
          <span key={index} className="animate-flip-words">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
