"use client";
import SigFollow from "./SigFollow";
import TextAppear from "./TextAppear";
import HeroBottom from "./HeroBottom";
import TextHighlight from "./TextHighlight";
import { gsap } from "@/lib/gsapConfig";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useRef } from "react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function Hero() {
  const heroRef = useRef(null);
  const heroRef2 = useRef(null);
  const LineVRef = useRef(null);
  const LineH1Ref = useRef(null);
  const LineH2Ref = useRef(null);
  const borderRefs = useRef([]);
  const bottomRef = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (
          !heroRef.current ||
          !LineH1Ref.current ||
          !LineH2Ref.current ||
          !LineVRef ||
          !borderRefs.current
        )
          return;

        // only on large screens
        if (window.innerWidth > 1024) {
          const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const smoother = ScrollSmoother.get();

            if (smoother) smoother.paused(true);

            tl.fromTo(
              [heroRef.current, heroRef2.current],
              {
                scale: 0.1,
                yPercent: 0,
                border: "60px solid #ffffff",
                borderRadius: "20px",
              },
              {
                scale: 0.3,
                yPercent: -16,
                borderRadius: "0px",
                border: "40px solid #ffffff",
                duration: 1,
                delay: 1,
                ease: "power1.out",
              }
            )
              .to([heroRef.current, heroRef2.current], {
                scale: 1,
                border: "0px solid #ffffff",
                rotate: 0,
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                yPercent: 0,
                duration: 0.5,
                ease: "power1.out",
                onComplete: () => {
                  if (smoother) smoother.paused(false);
                },
              })
              .fromTo(
                borderRefs.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: "power2.out" }
              )
              .fromTo(
                LineH1Ref.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: "power2.out" }
              )
              .fromTo(
                LineVRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 0.5, ease: "power2.out" },
                "-=0.5"
              )
              .fromTo(
                LineH2Ref.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: "power2.out" },
                "-=1"
              );
          }, heroRef);

          return () => ctx.revert();
        }
      },

      () => {
        if (!bottomRef.current) return;
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "-104px 80%",
              end: "-104px 40%",
              scrub: true,
              markers: false,
            },
          });

          tl.fromTo(
            bottomRef.current,
            {
              maxHeight: "104px",
            },
            {
              maxHeight: "0px",
              duration: 1,
              ease: "power3.out",
            }
          );
        }, heroRef);

        return () => ctx.revert();
      },
    ],

    dependencies: [],
  });

  return (
    <section className="w-full h-auto relative z-1 bg-[#000] overflow-hidden">
      <div className="w-full h-auto flex flex-col z-10 relative">
        <section
          className={`w-full flex flex-col relative justify-center min-h-screen bg-cover bg-center items-center z-1`}
        >
          <div
            className="max-w-[40vw] z-10 flex flex-col items-center justify-center absolute top-[5%] left-[50%] right-0 bottom-0 h-[70%]"
            style={{ transform: "translateX(-50%)" }}
          >
            <div className="w-full flex flex-col items-center justify-center h-full relative">
              <SigFollow />
            </div>
          </div>

          <div className="max-w-7xl container flex flex-col items-center pb-20 lg:pb-40 pointer-events-none z-10">
            <div className="flex flex-col gap-10 pb-4 ">
              <h1 className="flex flex-col items-center text-center mt-[160px] z-[1] mix-blend-difference">
                <TextHighlight
                  start="top 80%"
                  end="top 50%"
                  opacity={0}
                  delay={2.5}
                  y={0}
                  scrub={false}
                >
                  <span className="inline-block">
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      F
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      unctional &
                    </span>
                    <span> </span>
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      B
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      eautiful
                    </span>
                  </span>

                  <span className="inline-block">
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.00em",
                      }}
                    >
                      D
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      esigns for
                    </span>
                    <span> </span>
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      S
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      tartups
                    </span>
                  </span>

                  <span className="inline-block">
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.00em",
                      }}
                    >
                      —R
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      eady to
                    </span>
                    <span> </span>
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(36px, 6.97vw, 132px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "0.00em",
                      }}
                    >
                      S
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(32px, 6.25vw, 120px)",
                        lineHeight: "clamp(25px, 4.9vw, 94px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      cale
                    </span>
                  </span>
                </TextHighlight>
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                <div
                  ref={(el) => (borderRefs.current[0] = el)}
                  className="w-full h-[1px] bg-white/40"
                />
                <TextAppear
                  start="top 80%"
                  end="top 50%"
                  delay={2.5}
                  scrub={false}
                  classname={"w-full flex items-center justify-center"}
                >
                  <div className="flex flex-row items-center justify-between w-full max-w-[1080px] py-2 mx-3 lg:mx-0">
                    <div className="w-fit flex-row flex items-center gap-1">
                      <span
                        className="font-kings h-fit text-white pt-1"
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 12px)",
                          lineHeight: "clamp(12px, 1.75vw, 16px)",
                        }}
                      >
                        (01)
                      </span>
                      <span
                        className="font-oswald uppercase text-white font-medium"
                        style={{
                          fontSize: "clamp(10px, 1.5vw, 14px)",
                          lineHeight: "clamp(16px, 1.75vw, 20px)",
                        }}
                      >
                        Websites
                      </span>
                    </div>

                    <div className="w-fit flex-row flex items-center gap-1">
                      <span
                        className="font-kings h-fit text-white pt-1"
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 12px)",
                          lineHeight: "clamp(12px, 1.75vw, 16px)",
                        }}
                      >
                        (02)
                      </span>
                      <span
                        className="font-oswald uppercase text-white font-medium"
                        style={{
                          fontSize: "clamp(10px, 1.5vw, 14px)",
                          lineHeight: "clamp(16px, 1.75vw, 20px)",
                        }}
                      >
                        Web Apps
                      </span>
                    </div>

                    <div className="w-fit flex-row flex items-center gap-1">
                      <span
                        className="font-kings h-fit text-white pt-1"
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 12px)",
                          lineHeight: "clamp(12px, 1.75vw, 16px)",
                        }}
                      >
                        (03)
                      </span>
                      <span
                        className="font-oswald uppercase text-white font-medium"
                        style={{
                          fontSize: "clamp(10px, 1.5vw, 14px)",
                          lineHeight: "clamp(16px, 1.75vw, 20px)",
                        }}
                      >
                        Mobile Apps
                      </span>
                    </div>

                    <div className="w-fit flex-row flex items-center gap-1">
                      <span
                        className="font-kings h-fit text-white pt-1"
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 12px)",
                          lineHeight: "clamp(12px, 1.75vw, 16px)",
                        }}
                      >
                        (04)
                      </span>
                      <span
                        className="font-oswald uppercase text-white font-medium"
                        style={{
                          fontSize: "clamp(10px, 1.5vw, 14px)",
                          lineHeight: "clamp(16px, 1.75vw, 20px)",
                        }}
                      >
                        Graphic designs
                      </span>
                    </div>

                    <div className="w-fit flex-row flex items-center gap-1">
                      <span
                        className="font-kings h-fit text-white pt-1"
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 12px)",
                          lineHeight: "clamp(12px, 1.75vw, 16px)",
                        }}
                      >
                        (05)
                      </span>
                      <span
                        className="font-oswald uppercase text-white font-medium"
                        style={{
                          fontSize: "clamp(10px, 1.5vw, 14px)",
                          lineHeight: "clamp(16px, 1.75vw, 20px)",
                        }}
                      >
                        Animations
                      </span>
                    </div>
                  </div>
                </TextAppear>
                <div
                  ref={(el) => (borderRefs.current[1] = el)}
                  className="w-full h-[1px] bg-white/40"
                />
              </div>

              <div className="flex flex-col items-center z-[1] pointer-events-none justify-start">
                <div
                  className="bg-white/50 h-[1px] w-[30px] lg:w-[40px]"
                  ref={LineH1Ref}
                />
                <div
                  className="bg-white/50 h-[100px] lg:h-[400px] w-[1px]"
                  ref={LineVRef}
                />
                <div
                  className="bg-white/50 h-[1px] lg:w-[80px] w-[60px]"
                  ref={LineH2Ref}
                />
              </div>

              <h2 className="flex flex-col text-center h-auto uppercase mix-blend-difference pointer-events-none">
                <TextHighlight start="top 80%" end="top 50%" y={10}>
                  <span className="inline-block w-full">
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(40px, 2.92vw, 56px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      C
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(36px, 2.6vw, 50px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      reativity is
                    </span>
                    <span> </span>
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(40px, 2.92vw, 56px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      F
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(36px, 2.6vw, 50px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      inding
                    </span>
                  </span>

                  <span className="inline-block w-full">
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(40px, 2.92vw, 56px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      C
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(36px, 2.6vw, 50px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      larity in
                    </span>
                    <span> </span>
                    <span
                      className="font-kings text-white"
                      style={{
                        fontSize: "clamp(40px, 2.92vw, 56px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      C
                    </span>
                    <span
                      className=" font-archivo-narrow font-bold text-white h-auto uppercase"
                      style={{
                        fontSize: "clamp(36px, 2.6vw, 50px)",
                        lineHeight: "clamp(27.8px, 2vw, 40px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      haos
                    </span>
                  </span>
                </TextHighlight>
              </h2>

              <div className="flex flex-col items-center z-[1] pointer-events-none">
                <div className="bg-white/50 h-[1px] w-[60px] lg:w-[80px]"></div>
                <div className="bg-white/50 h-[100px] lg:h-[400px] w-[1px]"></div>
                <div className="bg-white/50 h-[1px] w-[30px] lg:w-[40px]"></div>
              </div>

              <div className="flex flex-col items-center gap-10 pointer-events-none">
                <h3
                  className="flex flex-row text-[46px] w-full items-center justify-center text-center"
                  style={{ fontSize: "clamp(24px, 2.4vw, 46px)" }}
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
                    Offerings
                  </span>
                </h3>
                <TextAppear
                  classname={"w-full "}
                  start={"top 70%"}
                  end={"top 10%"}
                >
                  <p
                    className="text-white/70 font-oswald uppercase font-semibold text-center px-5 lg:px-0"
                    style={{
                      fontSize: "clamp(20px, 2.92vw, 56px)",
                      lineHeight: "clamp(20px, 2.92vw, 56px)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    From SaaS startups to digital brands, I craft
                    high-converting UI, web, and visuals—
                    <span className="text-white">
                      built to turn first impressions into lasting impact.
                    </span>
                    <br />
                    No fluff. Just results. Ready when you are.
                  </p>
                </TextAppear>
              </div>
            </div>
          </div>
          <div className="w-full px-5 lg:px-20 py-2.5 flex justify-between z-10">
            <span className="text-white/60 font-medium font-archivo-narrow text-xs uppercase">
              AI Generated Image{" "}
              <span className="font-kings capitalize">of</span> Me
            </span>
            <span className="text-white/60 font-medium font-archivo-narrow text-xs uppercase">
              26°45&apos;42.2&quot;N 80°56&lsquo;23.2&quot;E
            </span>
          </div>
          <div className="w-full mb-[-1px]">
            <HeroBottom />
          </div>
        </section>
        <div
          className="w-full h-14 md:h-[104px] bg-white z-1 mb-[-1px]"
          ref={bottomRef}
        />
      </div>
      <div
        className="w-full h-full mb-[1px] absolute top-0 lg:-rotate-6 left-1/2 -translate-x-1/2 shadow-[0px_-50px_64px_10px_rgba(0,0,0,0.5)] bottom-0 bg-cover bg-center z-[1] sm:bg-[url('/home/MyImage.webp')] bg-[url('/home/HeroImgM.webp')]"
        style={{ backgroundPosition: "top" }}
        ref={heroRef}
      />
      <div
        className="w-full h-full mb-[1px] absolute hidden lg:block rotate-12 top-0 shadow-none translate-y-[-48px] md:translate-y-[-80px] lg:translate-y-[-120px] left-1/2 -translate-x-1/2 bottom-0 bg-cover bg-center z-0 sm:bg-[url('/home/MyImage.webp')] bg-[url('/home/HeroImgM.webp')]"
        style={{ backgroundPosition: "top" }}
        ref={heroRef2}
      />
    </section>
  );
}
