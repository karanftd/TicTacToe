import React from 'react';
import { Player } from '../logic/gameLogic';

interface SquareProps {
  value: Player;
  onClick: () => void;
  index: number;
  isWinner: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, index, isWinner }) => {
  return (
    <button 
      className={`square ${value ? value.toLowerCase() : ''} ${isWinner ? 'winner' : ''}`} 
      onClick={onClick}
      data-testid={`square-${index}`}
    >
      {value}
    </button>
  );
};

export default Square;
