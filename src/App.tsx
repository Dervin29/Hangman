import { useCallback, useEffect, useState, type ReactNode } from "react";
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

const MAX_WRONG_GUESSES = 6;

const Barcode = () => (
  <div aria-hidden className="hidden h-10 shrink-0 items-stretch gap-[3px] sm:flex">
    {[
      3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 5, 1, 2, 1, 3, 1, 4, 2, 1, 3, 1, 2, 1, 5,
      2, 1, 3, 1, 2, 4,
    ].map((w, i) => (
      <span key={i} className="bg-phosphor/80" style={{ width: `${w}px` }} />
    ))}
  </div>
);

const Crosshairs = () => (
  <>
    <span aria-hidden className="absolute left-1 top-1 font-mono text-xs leading-none text-hazard">
      +
    </span>
    <span aria-hidden className="absolute right-1 top-1 font-mono text-xs leading-none text-hazard">
      +
    </span>
    <span aria-hidden className="absolute bottom-1 left-1 font-mono text-xs leading-none text-hazard">
      +
    </span>
    <span aria-hidden className="absolute bottom-1 right-1 font-mono text-xs leading-none text-hazard">
      +
    </span>
  </>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-hazard">
    [ {children} ]
  </p>
);

const Telemetry = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="bg-crt p-3 sm:p-4">
    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
      {label}
    </p>
    <div className="font-mono text-sm font-bold uppercase sm:text-base">
      {children}
    </div>
  </div>
);

const App = () => {
  const [currentWord, setCurrentWord] = useState<WordItem>(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const wordToGuess = currentWord.word;
  const wordHint = currentWord.hint;

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  );

  const isLoser = incorrectLetters.length >= MAX_WRONG_GUESSES;

  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const gameOver = isWinner || isLoser;
  const remaining = MAX_WRONG_GUESSES - incorrectLetters.length;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      setGuessedLetters((prev) => {
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
    setGuessedLetters([]);
    setShowHint(false);
    setCurrentWord(getRandomWord());
  };

  return (
    <div className="relative min-h-dvh bg-crt text-phosphor">
      <div className="sr-only" aria-live="polite">
        {gameOver
          ? isWinner
            ? "You won! Word guessed."
            : "Game over. The word was revealed."
          : ""}
      </div>

      <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-6">
        <header className="mb-4 grid grid-cols-1 gap-px border-2 border-phosphor/70 bg-phosphor/70 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex items-center justify-between gap-4 bg-crt p-4 sm:p-5">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:text-xs">
                BCSM-9 // Lexical Termination System
              </p>
              <h1 className="font-display text-4xl uppercase leading-none tracking-[-0.03em] text-phosphor sm:text-6xl">
                Hangman
              </h1>
            </div>
            <Barcode />
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="bg-panel px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-phosphor transition-colors hover:bg-phosphor hover:text-crt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard sm:px-7 sm:text-sm"
          >
            &gt;&gt;&gt; New Run
          </button>
        </header>

        <section className="mb-4 grid grid-cols-2 gap-px border-2 border-phosphor/70 bg-phosphor/70 md:grid-cols-4">
          <Telemetry label="Lives Remaining">
            <span className="text-terminal">
              {String(remaining).padStart(2, "0")}
            </span>
          </Telemetry>
          <Telemetry label="Wrong Guesses">
            {String(incorrectLetters.length).padStart(2, "0")} / 06
          </Telemetry>
          <Telemetry label="Target Length">
            {String(wordToGuess.length).padStart(2, "0")} char
          </Telemetry>
          <Telemetry label="Miss Log">
            {incorrectLetters.length > 0
              ? incorrectLetters.join(" ").toUpperCase()
              : "--"}
          </Telemetry>
        </section>

        {gameOver && (
          <section
            className={`mb-4 border-2 bg-panel ${
              isWinner ? "border-terminal" : "border-hazard"
            }`}
          >
            <div
              aria-hidden
              className={`h-2 bg-[repeating-linear-gradient(45deg,#ff2a2a_0_10px,transparent_10px_20px)]`}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
                <span className={isWinner ? "text-terminal" : "text-hazard"}>
                  {isWinner
                    ? "STATUS: OBJECTIVE COMPLETE"
                    : "STATUS: TRANSMISSION TERMINATED"}
                </span>
                <span className="ml-2 text-muted">
                  // {isWinner ? "TARGET IDENTIFIED" : "TARGET EXECUTED"}{" "}
                  {!isWinner && (
                    <span className="text-phosphor">
                      : {wordToGuess.toUpperCase()}
                    </span>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={resetGame}
                className="border-2 border-phosphor bg-crt px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-phosphor transition-colors hover:bg-phosphor hover:text-crt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard"
              >
                &gt;&gt;&gt; Re-engage
              </button>
            </div>
          </section>
        )}

        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <section className="flex flex-col gap-6">
            <div className="relative border-2 border-phosphor/70 bg-panel p-4 sm:p-6">
              <Crosshairs />
              <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            </div>

            <div className="relative border-2 border-phosphor/70 bg-panel p-4 sm:p-6">
              <Crosshairs />
              <Tag>Word Grid</Tag>
              <HangmanWord
                key={wordToGuess}
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
              />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="relative border-2 border-phosphor/70 bg-panel p-4 sm:p-6">
              <Crosshairs />
              <div className="flex items-center justify-between gap-3">
                <Tag>Hint Relay</Tag>
                <button
                  type="button"
                  onClick={() => setShowHint((v) => !v)}
                  className="border-2 border-phosphor/70 bg-crt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-phosphor transition-colors hover:bg-phosphor hover:text-crt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard"
                >
                  {showHint ? "&lt;&lt; Seal" : "Reveal &gt;&gt;"}
                </button>
              </div>

              {showHint ? (
                <p className="animate-fade-up font-mono text-sm uppercase leading-relaxed tracking-wider text-phosphor">
                  &gt;&gt; {wordHint}
                </p>
              ) : (
                <p className="font-mono text-sm uppercase leading-relaxed tracking-wider text-muted">
                  &gt;&gt; [ signal encrypted ] :{" "}
                  <span className="animate-blink">_</span>
                </p>
              )}
            </div>

            <div className="relative border-2 border-phosphor/70 bg-panel p-4 sm:p-6">
              <Crosshairs />
              <Tag>Input Bay</Tag>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Type a letter or depress a key // input: [a-z]
              </p>
              <Keyboard
                key={wordToGuess}
                disabled={gameOver}
                activeLetters={guessedLetters.filter((l) =>
                  wordToGuess.includes(l),
                )}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />
            </div>
          </section>
        </div>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t-2 border-phosphor/30 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>&copy; 1986 BCSM Systems Div.</span>
          <span>Rev 2.6.1 // All Systems Nominal</span>
          <span>[ UNIT / D-01 ]</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
