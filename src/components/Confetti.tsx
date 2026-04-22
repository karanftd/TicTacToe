import React from 'react';
import '../styles/Confetti.css';

const Confetti: React.FC = () => {
  // Create 50 particles with random properties
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const style = {
      '--x': `${(Math.random() - 0.5) * 100}vw`,
      '--y': `${Math.random() * -100}vh`,
      '--rot': `${Math.random() * 360}deg`,
      '--color': `hsl(${Math.random() * 360}, 100%, 50%)`,
      '--delay': `${Math.random() * 0.5}s`,
      '--dur': `${1 + Math.random() * 2}s`,
      left: '50%',
      bottom: '0',
    } as React.CSSProperties;

    return <div key={i} className="confetti-particle" style={style} />;
  });

  return <div className="confetti-container">{particles}</div>;
};

export default Confetti;
