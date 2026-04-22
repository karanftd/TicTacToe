import { describe, it, expect } from 'vitest';
import { calculateWinner, isBoardFull, getBestMove, getRandomMove, Player } from '../logic/gameLogic';

describe('Game Logic', () => {
  describe('calculateWinner', () => {
    it('should return null for empty board', () => {
      const { winner, line } = calculateWinner(Array(9).fill(null));
      expect(winner).toBe(null);
      expect(line).toBe(null);
    });

    it('should return X for a row win', () => {
      const board: Player[] = ['X', 'X', 'X', 'O', null, 'O', null, null, null];
      const { winner, line } = calculateWinner(board);
      expect(winner).toBe('X');
      expect(line).toEqual([0, 1, 2]);
    });

    it('should return O for a col win', () => {
      const board: Player[] = ['X', 'O', null, 'X', 'O', null, null, 'O', null];
      const { winner, line } = calculateWinner(board);
      expect(winner).toBe('O');
      expect(line).toEqual([1, 4, 7]);
    });

    it('should return X for a diagonal win', () => {
      const board: Player[] = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
      const { winner, line } = calculateWinner(board);
      expect(winner).toBe('X');
      expect(line).toEqual([0, 4, 8]);
    });
  });

  describe('isBoardFull', () => {
    it('should return true if full', () => {
      const board: Player[] = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(isBoardFull(board)).toBe(true);
    });

    it('should return false if not full', () => {
      const board: Player[] = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null];
      expect(isBoardFull(board)).toBe(false);
    });
  });

  describe('getBestMove (AI Hard)', () => {
    it('should take the winning move', () => {
      // O can win at index 2
      const board: Player[] = ['O', 'O', null, 'X', 'X', null, null, null, null];
      expect(getBestMove(board)).toBe(2);
    });

    it('should block opponent from winning', () => {
      // X can win at 2
      const board: Player[] = ['X', 'X', null, 'O', null, null, null, null, null];
      expect(getBestMove(board)).toBe(2);
    });

    it('should take center if available first', () => {
      expect(getBestMove(Array(9).fill(null))).toBe(4);
    });
  });

  describe('getRandomMove (AI Easy)', () => {
    it('should return a valid move', () => {
      const board: Player[] = Array(9).fill(null);
      const move = getRandomMove(board);
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(9);
    });

    it('should return the only available move', () => {
      const board: Player[] = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', null];
      expect(getRandomMove(board)).toBe(8);
    });
  });
});
