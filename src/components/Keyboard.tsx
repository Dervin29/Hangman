const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  disabled: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

const Keyboard = ({
  disabled = false,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) => {
  return (
    <div className="w-full grid grid-cols-7 sm:grid-cols-9 gap-3">
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <button
            key={key}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
            className={`
              aspect-square rounded-xl text-xl font-bold uppercase
              border-2 transition-all duration-200
              flex items-center justify-center
              shadow-sm

              ${
                isActive
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-md scale-95"
                  : ""
              }

              ${
                isInactive
                  ? "bg-slate-200 border-slate-200 text-slate-400 opacity-60"
                  : ""
              }

              ${
                !isActive && !isInactive
                  ? `
                    bg-white border-slate-300 text-slate-700
                    hover:bg-slate-100
                    hover:border-slate-400
                    hover:-translate-y-0.5
                    active:scale-95
                  `
                  : ""
              }

              ${
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;