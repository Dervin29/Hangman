type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) => {
  const letterEm = (0.95 * 100) / (wordToGuess.length * 1.5);
  const fontSize = `clamp(1.25rem, ${letterEm.toFixed(2)}cqw, 3.5rem)`;

  return (
    <div className="@container w-full">
      <div
        className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 py-1"
        style={{ fontSize }}
        aria-label={`The hidden word has ${wordToGuess.length} letters`}
      >
        {wordToGuess.split("").map((letter, index) => {
          const isGuessed = guessedLetters.includes(letter);
          const show = isGuessed || reveal;

          return (
            <span
              key={index}
              className="flex w-[1.2em] items-end justify-center border-b-[0.08em] border-phosphor/70 pb-[0.04em]"
            >
              <span
                className={`font-mono uppercase leading-none transition-opacity duration-300 ${
                  show ? "opacity-100" : "opacity-0"
                } ${
                  !isGuessed && reveal ? "text-hazard" : "text-phosphor"
                }`}
              >
                {letter}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HangmanWord;
