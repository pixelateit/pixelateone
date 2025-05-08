import Image from "next/image";
import GradientImg from "@/public/home/GradientImg.webp";
import Image2 from "@/public/home/image-1.webp";

export default function Section3() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="pointer-events-none relative z-10 w-full h-[75vh] bg-white">
        <div className="flex h-full w-full" style={{ alignItems: "flex-end" }}>
          <div className=" relative h-[225vh] w-screen">
            <div
              className=" sticky top-0 flex h-screen w-full"
              style={{ alignItems: "flex-end" }}
            >
              <div
                className="absolute left-0 h-auto w-full"
                style={{ bottom: "-1x", top: "auto" }}
              >
                <div
                  className="flex origin-bottom flex-row"
                  style={{ transform: "scaleY(1)" }}
                >
                  {/* Background Image */}
                  <Image
                    src={GradientImg}
                    alt="Gradient"
                    loading="lazy"
                    className="h-full pointer-events-none origin-bottom-left object-fill bg-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen items-center bg-black py-80">
        {/* Selected Works */}
        <div className="flex flex-col container w-full max-w-7xl">
          <div className="flex flex-col items-center gap-6">
            <h3 className="flex flex-row text-5xl">
              <span
                className="text-white font-bold font-archivo-narrow"
                style={{ letterSpacing: "-0.05em", lineHeight: "30px" }}
              >
                Selected
              </span>
              <span
                className="text-white font-kings"
                style={{ lineHeight: "36px" }}
              >
                Works
              </span>
            </h3>

            <div className="w-full p-5 relative">
              <h2
                className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                style={{
                  fontSize: "clamp(40px, 7vw, 100px)",
                  lineHeight: "clamp(38px, 6vw, 95px)",
                  letterSpacing: "-0.05em",
                  background:
                    "radial-gradient(96.61% 397.64% at 0% 0%, #FFFFFF 45%, rgba(255, 255, 255, 0) 95%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                  textAlign: "center",
                  textTransparent: "true",
                }}
              >
                <span>We Are The Creative</span>
                <br />
                <span>Design Studio</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full h-screen overflow-hidden relative block">
          {/* Project 1 */}
          <div className="z-0 w-full h-screen absolute top-0 left-0 bg-black flex flex-col items-center justify-center">
            <div className="flex flex-row container max-w-7xl my-auto gap-10">
              <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
                <Image
                  loading="lazy"
                  src={GradientImg}
                  alt="Gradient"
                  className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col w-full py-5">
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-12 h-12 rounded-md bg-amber-700"></div>
                  <div className="flex flex-col">
                    <h5 className="text-white font-bold font-archivo text-xl">
                      Untitled Project
                    </h5>
                    <p className="text-[#AFAFAF] text-sm">
                      GAM is a consortium of physicians creating novel metrics
                      of healthcare quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project 2 */}
          <div className="z-1 w-full h-screen absolute top-[-100vh] left-0 bg-black flex flex-col items-center justify-center">
            <div className="flex flex-row container max-w-7xl my-auto gap-10">
              <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
                <Image
                  loading="lazy"
                  src={GradientImg}
                  alt="Gradient"
                  className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col w-full py-5">
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-12 h-12 rounded-md bg-blue-500"></div>
                  <div className="flex flex-col">
                    <h5 className="text-white font-bold font-archivo text-xl">
                      Untitled Project
                    </h5>
                    <p className="text-[#AFAFAF] text-sm">
                      GAM is a consortium of physicians creating novel metrics
                      of healthcare quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project 3 */}
          <div className="z-2 w-full h-screen absolute top-[-100vh] left-0 bg-black flex flex-col items-center justify-center">
            <div className="flex flex-row container max-w-7xl my-auto gap-10">
              <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
                <Image
                  loading="lazy"
                  src={GradientImg}
                  alt="Gradient"
                  className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col w-full py-5">
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-12 h-12 rounded-md bg-yellow-500"></div>
                  <div className="flex flex-col">
                    <h5 className="text-white font-bold font-archivo text-xl">
                      Untitled Project
                    </h5>
                    <p className="text-[#AFAFAF] text-sm">
                      GAM is a consortium of physicians creating novel metrics
                      of healthcare quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project 4 */}
          <div className="z-3 w-full h-screen absolute top-[-100vh] left-0 bg-black flex flex-col items-center justify-center">
            <div className="flex flex-row container max-w-7xl my-auto gap-10">
              <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
                <Image
                  loading="lazy"
                  src={GradientImg}
                  alt="Gradient"
                  className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col w-full py-5">
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-12 h-12 rounded-md bg-red-500"></div>
                  <div className="flex flex-col">
                    <h5 className="text-white font-bold font-archivo text-xl">
                      Untitled Project
                    </h5>
                    <p className="text-[#AFAFAF] text-sm">
                      GAM is a consortium of physicians creating novel metrics
                      of healthcare quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="max-w-7xl w-full flex flex-col items-center py-16">
            <div className="flex flex-col items-center">
              <div className="bg-white/50 h-[280px] w-[1px]"></div>
              <div className="bg-white/50 h-[1px] w-[60px]"></div>
            </div>

            <div className="w-full mt-16">
              <div
                className="text-white w-full flex flex-col items-center font-oswald text-center"
                style={{
                  fontSize: "clamp(72px, 12vw, 240px)",
                  lineHeight: "clamp(48px, 8vw, 160px)",
                  letterSpacing: "-0.04em",
                }}
              >
                <span>
                  <span className="font-kings">L</span>earn i
                  <span className="font-kings">t</span>
                </span>
                <span>
                  <span className="font-kings">T</span>weak i
                  <span className="font-kings">t</span>
                </span>
                <span>
                  <span className="font-kings">U</span>se i
                  <span className="font-kings">t</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center mt-16">
              <div className="bg-white/50 h-[1px] w-[60px]"></div>
              <div className="bg-white/50 h-[280px] w-[1px]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative w-full z-10 h-[75vh] bg-white">
        <div className="flex h-full w-full" style={{ alignItems: "flex-end" }}>
          <div className=" relative h-[225vh] w-screen">
            <div
              className=" sticky top-0 flex h-screen w-full"
              style={{ alignItems: "flex-end" }}
            >
              <div
                className="absolute left-0 h-auto w-full"
                style={{ bottom: "-1x", top: "auto" }}
              >
                <div
                  className="flex origin-bottom flex-row"
                  style={{ transform: "scaleY(1)" }}
                >
                  {/* Background Image */}
                  <Image
                    src={GradientImg}
                    alt="Gradient"
                    loading="lazy"
                    className="h-full pointer-events-none origin-bottom-left rotate-x-180 object-fill bg-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
