import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ProgressBar({ scrollContainerRef }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      setScrollPercent(percent);

      setIsVisible(scrollTop > 40);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      className="fixed bottom-5 right-5 mb-16 mr-0 flex h-14 w-14 items-center justify-center rounded-full bg-transparent shadow-lg transition-all lg:mb-16 lg:mr-5"
      onClick={scrollToTop}
      aria-label="Scroll to Top"
    >
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 36 36" className="h-full w-full">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            className="text-blue-900"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
            className="text-blue-400"
            strokeDasharray={`${scrollPercent}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowUp className="h-6 w-6 text-blue-400" strokeWidth={3} />
        </div>
      </div>
    </button>
  );
}
