import React from 'react';
import { Player } from '../logic/gameLogic';

interface SquareProps {
  value: Player;
  onClick: () => void;
  index: number;
}

const Square: React.FC<SquareProps> = ({ value, onClick, index }) => {
  return (
    <button 
      className={`square ${value ? value.toLowerCase() : ''}`} 
      onClick={onClick}
      data-testid={`square-${index}`}
    >
      {value}
    </button>
  );
};

export default Square;
