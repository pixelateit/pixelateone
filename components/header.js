import Image from "next/image";
import LogoLongW from "@/public/logoLongW.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full flex-row justify-between p-5 rounded-b-lg absolute top-0 z-10">
      <div className="px-[5px]">
        <Image src={LogoLongW} alt="Pixelateit Logo" />
      </div>
      <div className="flex flex-row gap-4">
        <Link
          href={"/"}
          className="px-6 py-2 bg-white hover:bg-[#2D0F09] rounded-full text-[#2D0F09] hover:text-white duration-300 font-oswald font-medium uppercase text-base"
        >
          Contact Me
        </Link>
        <button
          type="button"
          className="p-2 bg-white hover:bg-white/25 cursor-pointer rounded-full text-[#2D0F09] hover:text-white duration-300 font-oswald font-medium uppercase text-base"
        >
          <div className="w-6 h-6 p-1 flex flex-col justify-between">
            <div className="h-0.5 w-full bg-[#2D0F09]"></div>
            <div className="h-0.5 w-full bg-[#2D0F09]"></div>
            <div className="h-0.5 w-full bg-[#2D0F09]"></div>
          </div>
        </button>
      </div>
    </header>
  );
}
