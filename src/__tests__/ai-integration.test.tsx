import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../components/App';
import React from 'react';

// Mock matchMedia for testing responsive designs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('AI Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should start a game against AI and wait for AI to move', async () => {
    render(<App />);

    // Select AI mode and start
    const aiModeBtn = screen.getByTestId('mode-ai');
    fireEvent.click(aiModeBtn);
    
    const startBtn = screen.getByTestId('start-game');
    fireEvent.click(startBtn);

    // Should be on game screen
    expect(screen.getByTestId('game-screen')).toBeTruthy();
    expect(screen.getByTestId('status-badge').textContent).toBe("X's Turn");

    // Player X moves at index 0
    const square0 = screen.getByTestId('square-0');
    fireEvent.click(square0);
    expect(square0.textContent).toBe('X');
    expect(screen.getByTestId('status-badge').textContent).toBe('AI is thinking...');

    // Fast-forward time for AI move
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check if AI (O) has moved. O usually takes center (4) if empty.
    const squares = screen.getAllByRole('button').filter(btn => btn.className.includes('square'));
    const oMoves = squares.filter(sq => sq.textContent === 'O');
    expect(oMoves.length).toBe(1);
    expect(screen.getByTestId('status-badge').textContent).toBe("X's Turn");
  });

  it('should correctly handle a full game with AI', () => {
    render(<App />);

    // Select AI mode and start
    fireEvent.click(screen.getByTestId('mode-ai'));
    fireEvent.click(screen.getByTestId('start-game'));

    // Move 1: X takes 0, AI takes center (4)
    fireEvent.click(screen.getByTestId('square-0'));
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByTestId('square-4').textContent).toBe('O');

    // Move 2: X takes 1, AI should block or take its own move
    fireEvent.click(screen.getByTestId('square-1'));
    act(() => { vi.advanceTimersByTime(1000); });
    
    // Check that there are now 2 'O's on the board
    const squares = screen.getAllByRole('button').filter(btn => btn.className.includes('square'));
    const oMoves = squares.filter(sq => sq.textContent === 'O');
    expect(oMoves.length).toBe(2);
  });
});
