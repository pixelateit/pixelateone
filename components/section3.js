import WaveBlendUp from "./WaveBlendUp";
import WorkSections from "./WorkSections";
import TextHighlight from "./TextHighlight";
import TextAppear from "./TextAppear";
import WaveBlendDown from "./WaveBlendDown";
import PosterCards from "./PosterCards";
import MaskGrp from "@/public/home/MaskGroup.webp";
import ThreeDSection from "./ThreeDSection";

export default function Section3() {
  return (
    <section className="flex flex-col items-center justify-center w-full relative bg-black">
      <WaveBlendUp />

      <div className="flex flex-col w-full min-h-screen items-center bg-black py-80 mt-[-1px]">
        {/* Selected Works */}
        <div
          className="flex flex-col container w-full max-w-7xl pb-28"
          id="work-s"
        >
          <div className="flex flex-col items-center gap-3 lg:gap-6">
            <TextHighlight opacity={0}>
              <h3
                id="myWork"
                className="flex flex-row"
                style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
              >
                <span
                  className="text-white font-bold font-archivo-narrow"
                  style={{
                    letterSpacing: "-0.05em",
                    lineHeight: "clamp(20px, 1.56vw, 30px)",
                  }}
                >
                  Selected
                </span>
                <span
                  className="text-white font-kings"
                  style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
                >
                  Works
                </span>
              </h3>
            </TextHighlight>

            <div className="w-full relative">
              <h2
                className="text-[#ffffff] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                style={{
                  fontSize: "clamp(32px, 4.16vw, 80px)",
                  lineHeight: "clamp(30px, 3.75vw, 72px)",
                  letterSpacing: "-0.05em",
                  textAlign: "center",
                  textTransparent: "true",
                }}
              >
                <TextAppear start="top 55%" end="top 5%">
                  <span>Projects That Blend Beauty,</span>
                  <br />
                  <span>Function, and ROI.</span>
                </TextAppear>
              </h2>
            </div>
          </div>
        </div>
        <WorkSections />

        <ThreeDSection />

        <div
          className="flex flex-col w-full min-h-screen items-center"
          style={{
            backgroundImage: `url(${MaskGrp.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="dragZone"
        >
          <div className="w-full flex flex-col items-center max-w-7xl">
            <div className="flex flex-col items-center gap-3 lg:gap-6">
              <TextHighlight opacity={0}>
                <h3
                  id="myPosters"
                  className="flex flex-row"
                  style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
                >
                  <span
                    className="text-white font-bold font-archivo-narrow"
                    style={{
                      letterSpacing: "-0.05em",
                      lineHeight: "clamp(20px, 1.56vw, 30px)",
                    }}
                  >
                    My
                  </span>
                  <span
                    className="text-white font-kings"
                    style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
                  >
                    Posters
                  </span>
                </h3>
              </TextHighlight>

              <div className="w-full relative">
                <h2
                  className="text-[#ffffff] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                  style={{
                    fontSize: "clamp(32px, 4.16vw, 80px)",
                    lineHeight: "clamp(30px, 3.75vw, 72px)",
                    letterSpacing: "-0.05em",
                    textAlign: "center",
                    textTransparent: "true",
                  }}
                >
                  <TextAppear start="top 55%" end="top 5%">
                    <span>Projects That Blend Beauty,</span>
                    <br />
                    <span>Function, and ROI.</span>
                  </TextAppear>
                </h2>
              </div>
            </div>

            <PosterCards />
          </div>
        </div>
      </div>

      <WaveBlendDown />
    </section>
  );
}
