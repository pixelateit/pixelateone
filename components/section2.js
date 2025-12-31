import Image from "next/image";
import HandWithCapsule from "./HandWithCapsule";
import Hunch from "@/public/home/Hunch.svg";
import TextHighlight from "./TextHighlight";
import TextAppear from "./TextAppear";
import RamsQuote from "./RamsQuote";
import HowWorks from "./HowWorks";
import TextHighlightColor from "./TextHeighlightColor";
import ProductShow from "./ProductShow";
import Sec2Cat from "./Sec2Cat";

export default function Section2() {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white ">
      <div className=" lg:max-w-7xl md:max-w-5xl w-full flex flex-col items-center pt-20 z-1">
        <div className="flex flex-col items-center">
          <div className="bg-[#cccccc] h-[100px] lg:h-[200px] w-[1px]"></div>
          <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[60px]"></div>
        </div>

        <div className="flex flex-col items-center gap-3 lg:gap-6 lg:mt-16 mt-8">
          <h3
            id="myHunch"
            className="flex justify-center flex-row"
            style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
          >
            <span
              className="text-[#2D0F09] font-bold font-archivo-narrow"
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "clamp(20px, 1.56vw, 30px)",
              }}
            >
              My
            </span>
            <span
              className="text-[#2D0F09] font-kings"
              style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
            >
              Creative
            </span>
            <Image
              src={Hunch}
              alt="Hunch"
              height={32}
              width={"auto"}
              className="aspect-auto h-8 w-fit ms-0.5 mt-0.5 lg:mt-0"
              style={{ height: "clamp(16px, 1.66vw, 32px)" }}
            />
          </h3>

          <div className="w-full flex flex-col items-center gap-3 lg:gap-6 ">
            <div className="w-full relative">
              <div
                className="w-80 h-[120px] lg:h-[250px] absolute bottom-6 left-1/2 z-2"
                style={{ transform: "translateX(-50%)" }}
              >
                <Sec2Cat />
              </div>
              <div className="w-full hidden lg:flex items-center justify-between absolute top-[15%]">
                <span
                  className="w-full flex flex-col items-center justify-center text-start text-base normal-case font-archivo-narrow font-semibold text-[#2D0F09]"
                  style={{
                    letterSpacing: "-0.05em",
                    lineHeight: "1",
                  }}
                >
                  <span className="flex flex-col">
                    <span>
                      Driven by{" "}
                      <span className="font-kings font-normal tracking-normal">
                        Instinct
                      </span>
                    </span>
                    <span>
                      <span className="font-kings font-normal tracking-normal">
                        Refined
                      </span>{" "}
                      through design.
                    </span>
                  </span>
                </span>

                <span className="w-full h-2.5"></span>

                <span
                  className="w-full flex flex-col items-center justify-center text-start text-base normal-case font-archivo-narrow font-semibold text-[#2D0F09]"
                  style={{
                    letterSpacing: "-0.05em",
                    lineHeight: "1",
                  }}
                >
                  <span className="flex flex-col justify-end">
                    <span>
                      <span className="font-kings font-normal tracking-normal">
                        Minimal
                      </span>{" "}
                      in noise,
                    </span>
                    <span>
                      Maximal in{" "}
                      <span className="font-kings font-normal tracking-normal">
                        Impact
                      </span>
                      .
                    </span>
                  </span>
                </span>
              </div>
              <TextHighlightColor color1="#2D0F09" start="top 45%" end="top 5%">
                <p
                  className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                  style={{
                    fontSize: "clamp(46px, 9.89vw, 190px)",
                    lineHeight: "clamp(40px, 8.33vw, 160px)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <span className="w-full text-center">Where</span>
                  <span>Function Meets</span>
                  <span>Aesthetic Design</span>
                </p>
              </TextHighlightColor>
            </div>
            <TextAppear
              classname={"w-full flex flex-row items-center justify-between"}
            >
              <div className="w-full flex flex-row items-center justify-between lg:px-5">
                <div className="w-fit flex flex-row items-center gap-1">
                  <span
                    className="font-kings text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 12px)",
                      lineHeight: "clamp(12px, 1.75vw, 16px)",
                    }}
                  >
                    (01)
                  </span>
                  <span
                    className="font-oswald uppercase text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      lineHeight: "clamp(16px, 1.75vw, 20px)",
                    }}
                  >
                    Web Design
                  </span>
                </div>
                <div className="w-fit flex flex-row items-center gap-1">
                  <span
                    className="font-kings text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 12px)",
                      lineHeight: "clamp(12px, 1.75vw, 16px)",
                    }}
                  >
                    (02)
                  </span>
                  <span
                    className="font-oswald uppercase text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      lineHeight: "clamp(16px, 1.75vw, 20px)",
                    }}
                  >
                    Poster
                  </span>
                </div>
                <div className="w-fit flex flex-row items-center gap-1">
                  <span
                    className="font-kings text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 12px)",
                      lineHeight: "clamp(12px, 1.75vw, 16px)",
                    }}
                  >
                    (03)
                  </span>
                  <span
                    className="font-oswald uppercase text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      lineHeight: "clamp(16px, 1.75vw, 20px)",
                    }}
                  >
                    Pitch Deck
                  </span>
                </div>
                <div className="w-fit flex flex-row items-center gap-1">
                  <span
                    className="font-kings text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 12px)",
                      lineHeight: "clamp(12px, 1.75vw, 16px)",
                    }}
                  >
                    (04)
                  </span>
                  <span
                    className="font-oswald uppercase text-[#2D0F09]"
                    style={{
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      lineHeight: "clamp(16px, 1.75vw, 20px)",
                    }}
                  >
                    3D Animation
                  </span>
                </div>
              </div>
            </TextAppear>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex flex-col items-center lg:mt-16 mt-8">
            <div className="bg-[#cccccc] h-[100px] lg:h-[160px] w-[1px]"></div>
            <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[100px]"></div>
          </div>

          <RamsQuote />

          <div className="flex flex-col items-center">
            <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[100px]"></div>
            <div className="bg-[#cccccc] h-[172px] lg:h-[380px] w-[1px]"></div>
          </div>
        </div>
      </div>

      <HandWithCapsule className="mt-[-70px] lg:mt-[-320px] z-0" />

      <div className="lg:container w-full flex flex-col items-center mt-[-16px] lg:mt-[-80px] pb-20 z-1">
        <div className="flex flex-col items-center">
          <div className="bg-[#cccccc] h-[120px] lg:h-[180px] w-[1px]"></div>
          <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[100px]"></div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8 lg:mt-16">
          <h3
            className="flex justify-center flex-row"
            style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
          >
            <span
              className="text-[#2D0F09] font-bold font-archivo-narrow"
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "clamp(20px, 1.56vw, 30px)",
              }}
            >
              How It
            </span>
            <span
              className="text-[#2D0F09] font-kings"
              style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
            >
              Works
            </span>
          </h3>

          <HowWorks />
        </div>

        <div className="flex flex-col items-center mt-8 lg:mt-16">
          <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[100px]"></div>
          <div className="bg-[#cccccc] h-[120px] lg:h-[180px] w-[1px]"></div>
          <div className="bg-[#cccccc] h-[1px] w-[20px] lg:w-[60px]"></div>
        </div>
      </div>

      <ProductShow />
    </section>
  );
}
