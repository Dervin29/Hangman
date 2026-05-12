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
  return (
    <div className="flex flex-wrap justify-center gap-4 text-5xl sm:text-6xl font-extrabold uppercase tracking-widest">
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);

        return (
          <span
            key={index + 1}
            className="border-b-4 border-slate-800 min-w-[3.5rem] text-center pb-2"
          >
            <span
              className={`transition-all duration-300 ${
                isGuessed || reveal ? "opacity-100" : "opacity-0"
              } ${!isGuessed && reveal ? "text-red-500" : "text-slate-900"}`}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default HangmanWord;
