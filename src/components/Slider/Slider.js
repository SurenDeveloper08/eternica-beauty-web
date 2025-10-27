import React, { useState, useRef, useEffect, Children, cloneElement } from "react";
import "./Slider.css";

const Slider = ({ children, autoPlay = true, interval = 4000 }) => {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // --- Auto-play ---
  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, interval);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, autoPlay, interval, slides.length]);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // --- Swipe gestures ---
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext();
    if (touchStartX.current - touchEndX.current < -50) handlePrev();
  };

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Track */}
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((child, i) => (
          <div className="slide" key={i}>
            {cloneElement(child, { isActive: i === index })}

            {/* Dots/Lines inside image bottom center */}
            <div className="slider-progress-line inside">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`progress-segment ${idx === index ? "active" : ""}`}
                  onClick={() => setIndex(idx)}
                  style={{ animationDuration: `${interval}ms` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {slides.length > 1 && (
        <>
          <button className="nav-btn prev" onClick={handlePrev}>‹</button>
          <button className="nav-btn next" onClick={handleNext}>›</button>
        </>
      )}
    </div>
    );
};

export default Slider;
