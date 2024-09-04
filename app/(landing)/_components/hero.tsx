import { Heading } from "./heading";

const Hero = () => {
  return (
    <div className=" w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default Hero;
