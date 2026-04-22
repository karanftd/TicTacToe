import React, { useReducer, useEffect, useRef } from 'react';
import Board from './Board';
import { calculateWinner, isBoardFull, Player, getAiMove } from '../logic/gameLogic';
import '../styles/App.css';

// --- Types ---

type GameState = 'setup' | 'playing';
type PlayMode = 'local' | 'ai';
type Difficulty = 'easy' | 'hard';

interface State {
  gameState: GameState;
  playMode: PlayMode;
  aiDifficulty: Difficulty;
  history: { squares: Player[] }[];
  stepNumber: number;
  xIsNext: boolean;
  scores: { X: number; O: number };
  winnerCounted: boolean;
}

type Action =
  | { type: 'SET_MODE'; playMode: PlayMode }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'START_GAME' }
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'JUMP_TO'; step: number }
  | { type: 'NEW_ROUND' }
  | { type: 'BACK_TO_MENU' };

// --- Initial State ---

const initialState: State = {
  gameState: 'setup',
  playMode: 'local',
  aiDifficulty: 'hard',
  history: [{ squares: Array(9).fill(null) }],
  stepNumber: 0,
  xIsNext: true,
  scores: { X: 0, O: 0 },
  winnerCounted: false,
};

// --- Reducer ---

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, playMode: action.playMode };
    case 'SET_DIFFICULTY':
      return { ...state, aiDifficulty: action.difficulty };
    case 'START_GAME':
      return { ...state, gameState: 'playing' };
    case 'MAKE_MOVE': {
      const newHistory = state.history.slice(0, state.stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = [...current.squares];

      if (calculateWinner(squares) || squares[action.index]) {
        return state;
      }

      squares[action.index] = state.xIsNext ? 'X' : 'O';
      const updatedHistory = newHistory.concat([{ squares }]);
      
      const winner = calculateWinner(squares);
      let newScores = { ...state.scores };
      let winnerCounted = state.winnerCounted;

      if (winner && !winnerCounted) {
        newScores[winner as 'X' | 'O'] += 1;
        winnerCounted = true;
      }

      return {
        ...state,
        history: updatedHistory,
        stepNumber: updatedHistory.length - 1,
        xIsNext: !state.xIsNext,
        scores: newScores,
        winnerCounted: winnerCounted,
      };
    }
    case 'JUMP_TO':
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0,
        winnerCounted: calculateWinner(state.history[action.step].squares) !== null,
      };
    case 'NEW_ROUND':
      return {
        ...state,
        history: [{ squares: Array(9).fill(null) }],
        stepNumber: 0,
        xIsNext: true,
        winnerCounted: false,
      };
    case 'BACK_TO_MENU':
      return { ...initialState };
    default:
      return state;
  }
}

// --- Component ---

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  const draw = !winner && isBoardFull(current.squares);
  const isAiThinking = state.playMode === 'ai' && !state.xIsNext && !winner && !draw;

  // AI Side Effect
  useEffect(() => {
    if (isAiThinking) {
      // Clear any existing timer just in case
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

      aiTimerRef.current = setTimeout(() => {
        const move = getAiMove(current.squares, state.aiDifficulty);
        if (move !== -1) {
          dispatch({ type: 'MAKE_MOVE', index: move });
        }
        aiTimerRef.current = null;
      }, 600);
    }

    return () => {
      if (aiTimerRef.current) {
        clearTimeout(aiTimerRef.current);
        aiTimerRef.current = null;
      }
    };
  }, [isAiThinking, state.aiDifficulty, current.squares]);

  const renderSetupScreen = () => (
    <div className="setup-container fade-in" data-testid="setup-screen">
      <h1 className="title">Tic-Tac-Toe</h1>
      <p className="subtitle">Choose your play style</p>
      
      <div className="setup-options">
        <div className="mode-selection">
          <button 
            className={`mode-btn ${state.playMode === 'local' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_MODE', playMode: 'local' })}
            data-testid="mode-local"
          >
            Play Local
          </button>
          <button 
            className={`mode-btn ${state.playMode === 'ai' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_MODE', playMode: 'ai' })}
            data-testid="mode-ai"
          >
            Play vs AI
          </button>
        </div>

        {state.playMode === 'ai' && (
          <div className="difficulty-selection fade-in">
            <p>Select Difficulty</p>
            <div className="diff-options">
              <button 
                className={`diff-opt ${state.aiDifficulty === 'easy' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_DIFFICULTY', difficulty: 'easy' })}
                data-testid="diff-easy"
              >
                Easy
              </button>
              <button 
                className={`diff-opt ${state.aiDifficulty === 'hard' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_DIFFICULTY', difficulty: 'hard' })}
                data-testid="diff-hard"
              >
                Unbeatable
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="start-btn" onClick={() => dispatch({ type: 'START_GAME' })} data-testid="start-game">
        START GAME
      </button>
    </div>
  );

  const renderGameScreen = () => {
    const moves = state.history.map((_step, move) => (
      <button 
        key={move}
        className={`history-btn ${move === state.stepNumber ? 'current' : ''}`} 
        onClick={() => dispatch({ type: 'JUMP_TO', step: move })}
        data-testid={`jump-to-${move}`}
      >
        {move ? `#${move}` : 'Start'}
      </button>
    ));

    let statusText;
    if (winner) statusText = `Winner: ${winner}`;
    else if (draw) statusText = 'Result: Draw!';
    else if (isAiThinking) statusText = 'AI is thinking...';
    else statusText = `${state.xIsNext ? 'X' : 'O'}'s Turn`;

    return (
      <div className="game-container fade-in" data-testid="game-screen">
        <div className="top-bar">
          <button className="icon-btn" onClick={() => dispatch({ type: 'BACK_TO_MENU' })} data-testid="back-to-menu">
            ← Menu
          </button>
          <div className="game-scores">
            <div className="score-item x">
              <span className="label">X</span>
              <span className="value" data-testid="score-x">{state.scores.X}</span>
            </div>
            <div className="score-divider"></div>
            <div className="score-item o">
              <span className="label">O</span>
              <span className="value" data-testid="score-o">{state.scores.O}</span>
            </div>
          </div>
          <button className="icon-btn" onClick={() => dispatch({ type: 'NEW_ROUND' })} data-testid="new-round">
            Reset ↻
          </button>
        </div>

        <div className="game-status-box">
          <span className={`status-badge ${winner || draw ? 'game-over' : ''}`} data-testid="status-badge">
            {statusText}
          </span>
        </div>

        <div className="main-play-area">
          <Board 
            squares={current.squares} 
            onClick={(i) => dispatch({ type: 'MAKE_MOVE', index: i })} 
          />
        </div>

        <div className="history-timeline">
          <p>Time Travel</p>
          <div className="history-scroll">
            {moves}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-root">
      {state.gameState === 'setup' ? renderSetupScreen() : renderGameScreen()}
    </div>
  );
};

export default App;
