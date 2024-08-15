import { Heading } from "./heading";

const Hero = () => {
  return (
    <div className="dark:bg-[#1f1f1f] min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default Hero;
