import Image from "next/image";
import Image1 from "@/public/home/image.webp";
import Image2 from "@/public/home/image-1.webp";
import Image3 from "@/public/home/image-2.webp";
import Image4 from "@/public/home/image-3.webp";
import Image5 from "@/public/home/image-4.webp";

export default function ProductShow() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row items-center justify-center gap-2.5 p-2.5 w-full">
        <div className="rounded-xl overflow-hidden flex-grow max-w-1/5">
          <Image
            src={Image1}
            alt=""
            loading="lazy"
            height={520}
            width={"auto"}
            className="w-full h-full duration-300 hover:scale-105 aspect-auto"
          />
        </div>
        <div className=" rounded-xl overflow-hidden flex-grow max-w-1/5">
          <Image
            src={Image2}
            alt=""
            loading="lazy"
            height={520}
            width={"auto"}
            className="w-full h-full duration-300 hover:scale-105 aspect-auto"
          />
        </div>
        <div className=" rounded-xl overflow-hidden flex-grow max-w-1/5">
          <Image
            src={Image3}
            alt=""
            loading="lazy"
            height={520}
            width={"auto"}
            className="w-full h-full duration-300 hover:scale-105 aspect-auto"
          />
        </div>
        <div className=" rounded-xl overflow-hidden flex-grow max-w-1/5">
          <Image
            src={Image4}
            alt=""
            loading="lazy"
            height={520}
            width={"auto"}
            className="w-full h-full duration-300 hover:scale-105 aspect-auto"
          />
        </div>
        <div className=" rounded-xl overflow-hidden flex-grow max-w-1/5">
          <Image
            src={Image5}
            alt=""
            loading="lazy"
            height={520}
            width={"auto"}
            className="w-full h-full duration-300 hover:scale-105 aspect-auto"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-16">
        <div className="bg-[#cccccc] h-[1px] w-[60px]"></div>
        <div className="bg-[#cccccc] h-[180px] w-[1px]"></div>
      </div>
    </div>
  );
}
