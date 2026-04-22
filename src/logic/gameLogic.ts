export type Player = 'X' | 'O' | null;

export const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export function calculateWinner(squares: Player[]): Player {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function isBoardFull(squares: Player[]): boolean {
  return squares.every(sq => sq !== null);
}

export function getAvailableMoves(squares: Player[]): number[] {
  return squares.map((sq, i) => sq === null ? i : null).filter((i): i is number => i !== null);
}

/**
 * Minimax with Alpha-Beta Pruning
 * O is maximizer (10), X is minimizer (-10)
 */
function minimax(
  squares: Player[],
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const winner = calculateWinner(squares);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (isBoardFull(squares)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(squares)) {
      squares[move] = 'O';
      const score = minimax(squares, depth + 1, false, alpha, beta);
      squares[move] = null;
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of getAvailableMoves(squares)) {
      squares[move] = 'X';
      const score = minimax(squares, depth + 1, true, alpha, beta);
      squares[move] = null;
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  }
}

export function getBestMove(squares: Player[]): number {
  const availableMoves = getAvailableMoves(squares);
  if (availableMoves.length === 0) return -1;

  // Early game optimization
  if (availableMoves.length === 9) return 4; // Center
  if (availableMoves.length === 8 && squares[4] === null) return 4;

  let bestScore = -Infinity;
  let move = -1;
  const squaresCopy = [...squares];

  for (const m of availableMoves) {
    squaresCopy[m] = 'O';
    const score = minimax(squaresCopy, 0, false);
    squaresCopy[m] = null;
    if (score > bestScore) {
      bestScore = score;
      move = m;
    }
  }
  return move;
}

export function getRandomMove(squares: Player[]): number {
  const availableMoves = getAvailableMoves(squares);
  if (availableMoves.length === 0) return -1;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

export function getAiMove(squares: Player[], difficulty: 'easy' | 'hard'): number {
  return difficulty === 'easy' ? getRandomMove(squares) : getBestMove(squares);
}
