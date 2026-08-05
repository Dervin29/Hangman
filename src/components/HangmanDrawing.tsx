const BODY_PARTS = [
  <circle
    key="head"
    cx="195"
    cy="96"
    r="22"
    fill="#0a0a0a"
    stroke="#ff2a2a"
    strokeWidth="6"
  />,
  <line
    key="body"
    x1="195"
    y1="118"
    x2="195"
    y2="222"
    stroke="#ff2a2a"
    strokeWidth="8"
  />,
  <line
    key="right-arm"
    x1="195"
    y1="142"
    x2="236"
    y2="192"
    stroke="#ff2a2a"
    strokeWidth="8"
  />,
  <line
    key="left-arm"
    x1="195"
    y1="142"
    x2="154"
    y2="192"
    stroke="#ff2a2a"
    strokeWidth="8"
  />,
  <line
    key="right-leg"
    x1="195"
    y1="222"
    x2="236"
    y2="290"
    stroke="#ff2a2a"
    strokeWidth="8"
  />,
  <line
    key="left-leg"
    x1="195"
    y1="222"
    x2="154"
    y2="290"
    stroke="#ff2a2a"
    strokeWidth="8"
  />,
];

const HangmanDrawing = ({ numberOfGuesses }: { numberOfGuesses: number }) => {
  return (
    <svg
      viewBox="0 0 250 420"
      className="mx-auto block w-[min(16rem,60vw)] sm:w-72 lg:w-80"
      role="img"
      aria-label={`Hangman drawing with ${numberOfGuesses} incorrect ${
        numberOfGuesses === 1 ? "guess" : "guesses"
      }`}
    >
      <line x1="15" y1="410" x2="235" y2="410" stroke="#eaeaea" strokeWidth="10" />
      <line x1="40" y1="15" x2="40" y2="410" stroke="#eaeaea" strokeWidth="10" />
      <line x1="40" y1="25" x2="205" y2="25" stroke="#eaeaea" strokeWidth="10" />
      <line x1="195" y1="25" x2="195" y2="62" stroke="#eaeaea" strokeWidth="8" />
      <line x1="195" y1="62" x2="195" y2="74" stroke="#6f6f6f" strokeWidth="4" />
      {BODY_PARTS.slice(0, numberOfGuesses)}
    </svg>
  );
};

export default HangmanDrawing;
