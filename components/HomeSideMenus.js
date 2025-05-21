import Link from "next/link";
import TextScramble from "./TextScramble";

export default function HomeSideMenus() {
  return (
    <>
      {/*Left Side */}
      <div className="max-w-20 items-center max-h-screen pointer-events-none justify-center flex h-screen w-full flex-col gap-4 lg:py-30 fixed top-0 z-10 left-0">
        <div className="flex flex-col h-full items-center">
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
        </div>

        <div className="flex w-full gap-2 flex-col items-center">
          <div className="flex w-full flex-col items-center">
            <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
              Designer
            </span>
          </div>
          <div className="flex w-full flex-col items-center">
            <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
              Based In
              <br />
              Inida
            </span>
          </div>
        </div>

        <div className="flex flex-col h-full items-center">
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
        </div>
        <div className="flex w-full flex-col items-center">
          <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
            ©2025
          </span>
        </div>
      </div>
      {/*Right Side */}
      <div className="max-w-20 items-center max-h-screen justify-center flex h-screen w-full flex-col gap-4 lg:py-30 fixed top-0 z-10 right-0">
        <div className="flex flex-col h-full pointer-events-none items-center">
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
        </div>

        <div className="flex w-full gap-2 flex-col items-center">
          <div className="flex w-full flex-col items-center">
            <Link
              href="#"
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>About</TextScramble>
            </Link>
          </div>
          <div className="flex w-full flex-col items-center">
            <Link
              href="#work-s"
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Work</TextScramble>
            </Link>
          </div>
          <div className="flex w-full flex-col items-center">
            <Link
              href="#"
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Services</TextScramble>
            </Link>
          </div>
          <div className="flex w-full flex-col items-center">
            <Link
              href="#"
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Posters</TextScramble>
            </Link>
          </div>
          <div className="flex w-full flex-col items-center">
            <Link
              href="#"
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Insight</TextScramble>
            </Link>
          </div>
        </div>

        <div className="flex flex-col h-full pointer-events-none items-center">
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
        </div>
        <div className="flex w-full flex-col items-center">
          <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
            Menu
          </span>
        </div>
      </div>
    </>
  );
}
