import React, { FC } from "react";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import BurgerGIF from "../../public/assets/Hamburger.gif";
import BurgerGIFDark from "../../public/assets/Hamburger-dark.gif";
import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center pb-20 pt-32 border-b border-b-[#9e9e9e29]`}
    >
      <Image
        src={BurgerGIF}
        alt="Rockies_Burger"
        unoptimized
        width={250}
        height={250}
        className="dark:hidden transition-all"
      />
      <Image
        src={BurgerGIFDark}
        alt="Rockies_Burger"
        unoptimized
        width={250}
        height={250}
        className="hidden dark:!block transition-all"
      />
      <h1 className={`text-[35px] font-bold`}>
        Welcome to{" "}
        <span
          className={`bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-semibold tracking-tight`}
        >
          Rockies
        </span>
      </h1>

      <p className={`text-[20px] font-semibold text-[#666] dark:text-gray-300`}>
        - Food Truck -
      </p>

      <div className="md:w-[600px] w-full px-2 mt-3">
        <div className="border-[#ed8529] bg-[#fff5ec]  flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9">
          <div className="bg-[#ed8529]  w-[45px] h-[45px] flex justify-center items-center rounded-lg mr-5">
            <TriangleAlert color="white" size={30} className={`  `} />
          </div>
          <div className="w-full">
            <h5 className=" text-lg font-semibold text-[#ed8529]">
              Attention needed
            </h5>
            <p className="text-base leading-relaxed text-gray-600">
              Food may cause extreme happiness and uncontrollable cravings.
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`#menu`}
        className={`sm:w-[40%] md:w-[30%] w-[95%] px-2 py-3 rounded-full bg-primary flex justify-center items-center gap-2 mt-6 text-white transition-all hover:opacity-90`}
      >
        <IoFastFoodOutline size={20} className="text-white" />
        Make an order
      </Link>
    </div>
  );
};

export default Hero;
