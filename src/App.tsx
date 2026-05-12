import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

type WordItem = {
  word: string;
  hint: string;
};

const getRandomWord = (): WordItem => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  const [currentWord, setCurrentWord] = useState<WordItem>(getRandomWord);

  const [guessedLetters, setGuessLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const wordToGuess = currentWord.word;
  const wordHint = currentWord.hint;

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  );

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const gameOver = isWinner || isLoser;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      setGuessLetters((prev) => {
        if (prev.includes(letter)) return prev;
        if (gameOver) return prev;
        return [...prev, letter];
      });
    },
    [gameOver],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [addGuessedLetter]);

  const resetGame = () => {
    setGuessLetters([]);
    setShowHint(false);
    setCurrentWord(getRandomWord());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-screen p-6 sm:p-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
            Hangman
          </h1>

          <p className="text-slate-500 text-base sm:text-lg">
            Guess the hidden word
          </p>

          {isWinner && (
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              🎉 You Won!
            </div>
          )}

          {isLoser && (
            <div className="text-xl sm:text-2xl font-bold text-red-600">
              💀 Game Over
            </div>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col items-center gap-8">
            {/* Drawing */}
            <div className="flex justify-center">
              <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            </div>

            {/* Word */}
            <HangmanWord
              key={wordToGuess}
              reveal={isLoser}
              guessedLetters={guessedLetters}
              wordToGuess={wordToGuess}
            />

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <div className="bg-slate-100 px-4 py-2 rounded-xl">
                Wrong:{" "}
                <span className="text-red-500">
                  {incorrectLetters.length}/6
                </span>
              </div>

              <div className="bg-slate-100 px-4 py-2 rounded-xl">
                Correct:{" "}
                <span className="text-green-600">
                  {guessedLetters.filter((l) => wordToGuess.includes(l)).length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Hint */}
            <div className="w-full max-w-md">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-semibold">💡 Hint</span>

                  <button
                    onClick={() => setShowHint((v) => !v)}
                    className="text-sm px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded-lg"
                  >
                    {showHint ? "Hide" : "Show"}
                  </button>
                </div>

                {showHint && (
                  <p className="text-slate-700 mt-2 text-sm italic">
                    {wordHint}
                  </p>
                )}
              </div>
            </div>

            {/* Keyboard */}
            <div className="w-full">
              <Keyboard
                key={wordToGuess}
                disabled={gameOver}
                activeLetters={guessedLetters.filter((l) =>
                  wordToGuess.includes(l),
                )}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />

              {gameOver && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition"
                  >
                    Next Word
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
