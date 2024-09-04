import Spline from "@splinetool/react-spline";
import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          {/* <Image
            src="/heroes/hero-light.png"
            fill
            className="object-contain"
            alt="herolight"
          /> */}
          <div className="hidden dark:block w-full h-[350px]">
            <Spline scene="https://prod.spline.design/DCCzDMGisyF6CCrW/scene.splinecode" />
          </div>
          <div className=" dark:hidden w-full h-[350px]">
            <Spline scene="https://prod.spline.design/AaBYKDcX503IDoCB/scene.splinecode" />
          </div>
        </div>
      </div>
    </div>
  );
};
