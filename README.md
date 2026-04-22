# Tic-Tac-Toe (ttt)

A modern, responsive Tic-Tac-Toe game built with React, TypeScript, and Vitest. It features a smart AI opponent using the Minimax algorithm with Alpha-Beta pruning.

## Features

- **Local Multiplayer:** Play with a friend on the same device.
- **AI Opponent:** 
  - **Easy:** Random moves.
  - **Unbeatable:** Minimax algorithm that never loses.
- **Time Travel:** Navigate through the game history.
- **Score Tracking:** Keeps track of wins for both X and O.
- **Responsive Design:** Works on desktop and mobile.

## Screenshots

| Setup Screen | Game Screen |
|--------------|-------------|
| ![Setup](https://placehold.co/400x300?text=Setup+Screen) | ![Game](https://placehold.co/400x300?text=Game+Screen) |

## Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Styling:** Vanilla CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tictactoe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests

```bash
npm test
```

## Project Structure

- `src/components`: UI components (App, Board, Square).
- `src/logic`: Game engine and Minimax AI.
- `src/__tests__`: Unit and integration tests.
- `src/styles`: CSS animations and styling.

## License

MIT
