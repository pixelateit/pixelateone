import Image from "next/image";
import DesignS from "@/public/home/designS.webp";
import FunctionalS from "@/public/home/FunctionalS.webp";
import HandWithCapsule from "@/public/home/handWithCapsule.webp";
import Image1 from "@/public/home/image.webp";
import Image2 from "@/public/home/image-1.webp";
import Image3 from "@/public/home/image-2.webp";
import Image4 from "@/public/home/image-3.webp";
import Image5 from "@/public/home/image-4.webp";

export default function Section2() {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="max-w-7xl container w-full flex flex-col items-center pt-20">
        <div className="flex flex-col items-center">
          <div className="bg-[#D0D0D0] h-[200px] w-[1px]"></div>
          <div className="bg-[#D0D0D0] h-[1px] w-[60px]"></div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-16">
          <h3 className="flex flex-row text-5xl">
            <span
              className="text-[#2D0F09] font-bold font-archivo-narrow"
              style={{ letterSpacing: "-0.05em", lineHeight: "30px" }}
            >
              The
            </span>
            <span
              className="text-[#2D0F09] font-kings"
              style={{ lineHeight: "36px" }}
            >
              Creativity
            </span>
          </h3>

          <div className="w-full">
            <p
              className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
              style={{
                fontSize: "clamp(70px, 13vw, 236px)",
                lineHeight: "clamp(60px, 11vw, 200px)",
                letterSpacing: "-0.06em",
              }}
            >
              <span>We Are</span>
              <span>The Creative</span>
              <span>Design Studio</span>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center mt-16">
            <div className="bg-[#D0D0D0] h-[160px] w-[1px]"></div>
            <div className="bg-[#D0D0D0] h-[1px] w-[100px]"></div>
          </div>

          <div className="w-full flex flex-row items-center gap-8">
            <Image
              src={DesignS}
              alt="Beautiful Design"
              className="max-w-[212px] w-full aspect-video"
            />
            <div className="flex flex-row items-center w-full">
              <div className="bg-[#D0D0D0] h-[1px] w-full"></div>
              <div className="bg-[#D0D0D0] h-[80px] w-[1px]"></div>
            </div>
            <h3 className="flex flex-col min-w-[480px]">
              <span
                className="text-[#2D0F09] uppercase text-center font-oswald font-semibold text-3xl"
                style={{ letterSpacing: "-0.05em", lineHeight: "28px" }}
              >
                We believes in a world where top-tier
              </span>
              <span
                className="text-[#2D0F09] uppercase text-center font-oswald font-semibold text-3xl"
                style={{ letterSpacing: "-0.05em", lineHeight: "28px" }}
              >
                design and motion can take your
              </span>
              <span
                className="text-[#2D0F09] uppercase text-center font-oswald font-semibold text-3xl"
                style={{ letterSpacing: "-0.05em", lineHeight: "28px" }}
              >
                brand to the stage it truly deserves
              </span>
            </h3>
            <div className="flex flex-row items-center w-full ">
              <div className="bg-[#D0D0D0] h-[80px] w-[1px]"></div>
              <div className="bg-[#D0D0D0] h-[1px] w-full"></div>
            </div>
            <Image
              src={FunctionalS}
              alt="Functional Design"
              className="max-w-[212px] w-full aspect-video"
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#D0D0D0] h-[1px] w-[100px]"></div>
            <div className="bg-[#D0D0D0] h-[380px] w-[1px]"></div>
          </div>
        </div>
      </div>

      <Image
        src={HandWithCapsule}
        alt="Visual vs Functional"
        className="w-full aspect-auto mt-[-320px] -z-1"
      />

      <div className="max-w-7xl container w-full flex flex-col items-center mt-[-80px] pb-20">
        <div className="flex flex-col items-center">
          <div className="bg-[#D0D0D0] h-[180px] w-[1px]"></div>
          <div className="bg-[#D0D0D0] h-[1px] w-[100px]"></div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-16">
          <h3 className="flex flex-row text-5xl">
            <span
              className="text-[#2D0F09] font-bold font-archivo-narrow"
              style={{ letterSpacing: "-0.05em", lineHeight: "30px" }}
            >
              How It
            </span>
            <span
              className="text-[#2D0F09] font-kings"
              style={{ lineHeight: "36px" }}
            >
              Works
            </span>
          </h3>

          <div className="w-full p-5 relative">
            <div className="h-8 w-8 border-[#AFAFAF] border-l border-t absolute top-0 left-0"></div>
            <div className="h-8 w-8 border-[#AFAFAF] border-r border-t absolute top-0 right-0"></div>
            <div className="h-8 w-8 border-[#AFAFAF] border-l border-b absolute bottom-0 left-0"></div>
            <div className="h-8 w-8 border-[#AFAFAF] border-r border-b absolute bottom-0 right-0"></div>
            <p
              className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
              style={{
                fontSize: "clamp(32px, 7vw, 72px)",
                lineHeight: "clamp(28px, 6vw, 64px)",
                letterSpacing: "-0.06em",
              }}
            >
              <span>Your Superpower test,</span>
              <span>
                <span className="text-[#FF471E]">10x</span> better than an
              </span>
              <span>annual physical</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-16">
          <div className="bg-[#D0D0D0] h-[1px] w-[100px]"></div>
          <div className="bg-[#D0D0D0] h-[180px] w-[1px]"></div>
          <div className="bg-[#D0D0D0] h-[1px] w-[60px]"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center justify-center gap-2.5 p-2.5 w-full">
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={Image1}
              alt=""
              loading="lazy"
              className="w-full h-full duration-300 hover:scale-105 aspect-auto"
            />
          </div>
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={Image2}
              alt=""
              loading="lazy"
              className="w-full h-full duration-300 hover:scale-105 aspect-auto"
            />
          </div>
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={Image3}
              alt=""
              loading="lazy"
              className="w-full h-full duration-300 hover:scale-105 aspect-auto"
            />
          </div>
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={Image4}
              alt=""
              loading="lazy"
              className="w-full h-full duration-300 hover:scale-105 aspect-auto"
            />
          </div>
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={Image5}
              alt=""
              loading="lazy"
              className="w-full h-full duration-300 hover:scale-105 aspect-auto"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-16">
          <div className="bg-[#D0D0D0] h-[1px] w-[60px]"></div>
          <div className="bg-[#D0D0D0] h-[180px] w-[1px]"></div>
        </div>
      </div>
    </section>
  );
}
