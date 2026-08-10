# Hangman

A browser-based Hangman game with a retro CRT-terminal aesthetic. Guess the hidden word letter by letter before the hangman is fully drawn; every word includes a hint you can reveal.

## Demo

- [Live App](https://hangman-wheat-eight.vercel.app/)
- [GitHub Repository](https://github.com/Dervin29/Hangman)

## Features

- Random word selection from a built-in list of 850+ words, each with a hint
- On-screen keyboard and physical keyboard input
- Progressive SVG hangman drawing after each incorrect guess (six lives)
- Win/lose detection, with the correct word revealed on a loss
- Restart a round at any time from the header or the end-of-game banner
- Responsive layout styled as a CRT terminal (scanlines, noise grain, phosphor/hazard palette)

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Build tooling** | Vite |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm

No environment variables are required.

### Installation

```bash
git clone https://github.com/Dervin29/Hangman.git
cd hangman
npm install
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/              # Hangman drawing, word display, and letter keyboard
│   ├── HangmanDrawing.tsx
│   ├── HangmanWord.tsx
│   └── Keyboard.tsx
├── wordList.json            # 850+ words with hints
├── App.tsx                  # Game state, input handling, and layout
├── main.tsx                 # App entry point
└── index.css                # Tailwind theme and CRT styling
```

## How It Works

1. A random word and its hint are loaded from `wordList.json`.
2. The player guesses letters with the on-screen keys or the physical keyboard.
3. Correct guesses reveal the matching letters in the word grid.
4. Each incorrect guess draws the next body part; the player has six lives.
5. Guessing every letter wins; six wrong guesses loses and reveals the word.
6. The player can start a new round at any time.

## Known Limitations

- Runs entirely in the browser — scores are not saved between sessions.
- Single built-in English word list; no difficulty levels or custom word lists.
- Static, client-side app with no server component.

## Future Improvements

- Difficulty levels based on word length
- Score tracking with best-score persistence
- Timed rounds
- User-defined word lists

## Author

**Dervin29**

- [GitHub](https://github.com/Dervin29)
