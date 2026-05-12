const HEAD = (
  <div className=" w-[50px] h-[50px] rounded-full border-[10px] absolute top-[50px] right-[-20px]"></div>
);

const BODY = (
  <div className=" w-[10px] h-[120px] rounded-full bg-black absolute top-[90px] right-0"></div>
);

const RIGHT_ARM = (
  <div className=" w-[100px] h-[10px] rounded-full bg-black absolute top-[130px] right-[-85px] rotate-[-30deg]"></div>
);

const LEFT_ARM = (
  <div className=" w-[100px] h-[10px] rounded-full bg-black absolute top-[130px] right-[-5px] rotate-[30deg]"></div>
);

const RIGHT_LEG = (
  <div className=" w-[100px] h-[10px] rounded-full bg-black absolute top-[230px] right-[-5px] rotate-[145deg]"></div>
);

const LEFT_LEG = (
  <div className=" w-[100px] h-[10px] rounded-full bg-black absolute top-[230px] right-[-85px] rotate-[35deg]"></div>
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, RIGHT_LEG, LEFT_ARM, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="relative">
      {BODY_PARTS.slice(0, numberOfGuesses)};
      <div className="h-[20px] w-[10px] bg-black top-8 right-0 absolute "></div>
      <div className="h-[10px] w-[200px] bg-black ml-[120px]"></div>
      <div className="h-[400px] w-[10px] bg-black ml-[120px]"></div>
      <div className="h-[10px] w-[250px] bg-black"></div>
    </div>
  );
};

export default HangmanDrawing;
