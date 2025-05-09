import React, { useEffect, useState } from 'react';
import './SliderComponent.css';

export default function SliderComponent({ children }) {
  const [position, setPosition] = useState(0);
  const [displayedCards, setDisplayedCards] = useState(3); 
  const totalCards = children.length;

  // Update the number of displayed cards when the screen is resized
  const updateCards = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setDisplayedCards(3); 
    } else if (width >= 992) {
      setDisplayedCards(2); 
    } else {
      setDisplayedCards(1); 
    }
  };
  useEffect(() => {
    updateCards(); 
    window.addEventListener('resize', updateCards); 
    return () => {
      window.removeEventListener('resize', updateCards); 
    };
  }, []);

  const handleNext = () => {
    setPosition((prev) => (prev + displayedCards) % totalCards);
  };

  const handlePrev = () => {
    setPosition((prev) => (prev - displayedCards + totalCards) % totalCards); 
  };

 // get the visible cards based on current position
  const visibleCards = [
    ...children.slice(-position), // slice the last position 
    ...children.slice(0, totalCards - position),
  ];

  return (
    <div className="main-slider-container">

      <button className="left-arrow" onClick={handlePrev}>
        <img src="/assets/icons/slider_left_arrow.svg" alt="left arrow" />
      </button>

      <div className="slider-wrapper">
        {visibleCards.slice(0, displayedCards).map((card, index) => (
          <div className="slider-card" key={index}>
            {card}
          </div>
        ))}
      </div>

      <button className="right-arrow" onClick={handleNext}>
        <img src="/assets/icons/slider_right_arrow.svg" alt="right arrow" />
      </button>

      <div className="mobile-buttons">
        <button className="left-arrow-mobile" onClick={handlePrev}>
          <img src="/assets/icons/slider_left_arrow.svg" alt="left arrow" />
        </button>
        <button className="right-arrow-mobile" onClick={handleNext}>
          <img src="/assets/icons/slider_right_arrow.svg" alt="right arrow" />
        </button>
      </div>
    </div>
  );
}
