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
    <div
      className="grid w-full select-none grid-cols-7 gap-1.5 sm:gap-2 lg:grid-cols-9 lg:gap-2.5"
      role="group"
      aria-label="Letter keys"
    >
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        const state = isActive ? "active" : isInactive ? "inactive" : "idle";

        return (
          <button
            key={key}
            type="button"
            aria-label={`Letter ${key}`}
            aria-pressed={isActive}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
            className={[
              "aspect-square border-2 font-mono text-base font-bold uppercase",
              "flex items-center justify-center",
              "transition-colors duration-150",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard",
              "sm:text-lg lg:text-xl",
              state === "active"
                ? "border-phosphor bg-phosphor text-crt"
                : "",
              state === "inactive"
                ? "border-hazard/60 text-hazard/60 line-through"
                : "",
              state === "idle"
                ? "border-phosphor/60 text-phosphor hover:bg-phosphor/10"
                : "",
              disabled
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer",
            ].join(" ")}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
