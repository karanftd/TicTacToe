import React from 'react';
import Square from './Square';
import { Player } from '../logic/gameLogic';

interface BoardProps {
  squares: Player[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          key={i}
          index={i}
          value={square}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
};

export default Board;
