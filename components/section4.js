"use client";

import Image from "next/image";
import TextAppear from "./TextAppear";
import TextHighlight from "./TextHighlight";
import MyImage2 from "../public/home/MyImage2.webp";
import ProfileGif from "../public/home/profileGif.gif";
import SignatureLong from "../public/home/SignatureLong.svg";
import BlogSection from "./BlogSection";
import PageTorn from "@/public/home/pageTorn2.webp";
import SkillSection from "./SkillSection";
import BWin from "@/public/home/DotImage.png";
export default function Section4() {
  return (
    <section
      className="flex flex-col relative items-center justify-center w-full bg-white"
      id="bgColorCh"
    >
      <div className="flex flex-col container w-full max-w-7xl my-20">
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <TextHighlight opacity={0}>
            <h3
              id="aboutMe"
              className="flex flex-row"
              style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
            >
              <span
                className="text-[#2D0F09] font-bold font-archivo-narrow"
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "clamp(20px, 1.56vw, 30px)",
                }}
              >
                About
              </span>
              <span
                className="text-[#2D0F09] font-kings"
                style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
              >
                Me
              </span>
            </h3>
          </TextHighlight>

          <div className="w-full relative">
            <TextAppear start="top 55%" end="top 5%">
              <h2
                className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                style={{
                  fontSize: "clamp(32px, 4.16vw, 80px)",
                  lineHeight: "clamp(30px, 3.75vw, 72px)",
                  letterSpacing: "-0.05em",
                  textAlign: "center",
                  textTransparent: "true",
                }}
              >
                <span>From Pixels to Purpose</span>
                {/* <br /> */}
                <span>
                  <span className="font-normal">—</span>Here’s the Story
                </span>
              </h2>
            </TextAppear>
          </div>
        </div>
        <div className="w-full min-h-screen py-20">
          <div className="w-full flex flex-col items-center justify-center relative">
            <div className="w-fit group">
              <Image
                src={SignatureLong}
                alt="Signature Long"
                priority
                width={560}
                className="aspect-auto rotate-[-4deg] pointer-events-none absolute top-[45%] left-[50%] z-2"
                style={{
                  maxWidth: "clamp(390px, 29vw, 560px)",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="w-fit bg-white rounded-[4px] p-2 flex flex-col gap-2 rotate-[3deg] group-hover:border border-black/10 group-hover:shadow-[0_8px_8px_-4px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-105"
                style={{ maxWidth: "clamp(300px, 20vw, 380px)" }}
              >
                <div className="rounded-[2px] w-full overflow-hidden relative">
                  <Image
                    src={MyImage2}
                    alt="My Image"
                    priority
                    width={404}
                    className="rounded-[2px] aspect-auto w-full"
                  />
                  <div
                    className="absolute w-full h-full top-0 left-0 opacity-0 bg-cover aspect-auto group-hover:opacity-100 transition-all duration-500 ease-in-out "
                    style={{
                      backgroundImage: `url(${BWin.src})`,
                      pointerEvents: "none",
                      mixBlendMode: "darken",
                    }}
                  ></div>
                </div>
                <div className="flex flex-col gap-0 px-2 py-1">
                  <h4 className="font-archivo font-semibold text-xl text-[#2D0F09]">
                    Prakhar Srivastava
                  </h4>
                  <p className="font-archivo font-light text-base text-[#6F6867]">
                    Multi-disciplinary Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-8 lg:mt-0 flex flex-col md:flex-row justify-between px-5 lg:px-[100px]">
            <div className="flex md:max-w-[380px] flex-col">
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="font-archivo-narrow font-bold uppercase text-[#2D0F09] text-xs">
                      Approach
                    </span>
                    <div className="w-8 h-[1px] bg-[#2D0F09]"></div>
                  </div>
                  <TextHighlight start="top 60%" end="top 30%">
                    <h2
                      className="font-archivo-narrow font-bold text-[#2D0F09]"
                      style={{
                        fontSize: "clamp(24px, 2.4vw, 48px)",
                        lineHeight: "clamp(22px, 2.2vw, 44px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      Designing with
                      <br />
                      Purpose &<br />
                      <span
                        className="font-kings font-normal"
                        style={{ letterSpacing: 0 }}
                      >
                        Clarity
                      </span>
                    </h2>
                  </TextHighlight>
                  <TextAppear start="top 60%" end="top 30%">
                    <p
                      className="font-archivo font-medium text-[#6F6867] text-base"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Design isn’t just how it looks—it’s how it works. My
                      approach blends clarity with creativity to solve real
                      problems, spark engagement, and drive results.
                    </p>
                  </TextAppear>
                  <TextAppear start="top 60%" end="top 30%">
                    <p
                      className="font-archivo font-medium text-[#6F6867] text-base"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Every project starts with a deep dive into your brand,
                      audience, and goals—so the final design isn’t just
                      visually sharp, but purposeful, strategic, and built for
                      impact.
                    </p>
                  </TextAppear>
                </div>
                <Image
                  src={ProfileGif}
                  alt="Profile Gif"
                  unoptimized
                  width={404}
                  className="aspect-auto mix-blend-multiply"
                />
              </div>
            </div>
            <div className="flex md:max-w-[380px] flex-col">
              <div className="flex w-full flex-col md:mt-[200px]">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="font-archivo-narrow font-bold uppercase text-[#2D0F09] text-xs">
                      Background
                    </span>
                    <div className="w-8 h-[1px] bg-[#2D0F09]"></div>
                  </div>
                  <TextHighlight start="top 60%" end="top 30%">
                    <h2
                      className="font-archivo-narrow font-bold text-[#2D0F09]"
                      style={{
                        fontSize: "clamp(24px, 2.4vw, 48px)",
                        lineHeight: "clamp(22px, 2.2vw, 44px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      From{" "}
                      <span
                        className="font-kings font-normal"
                        style={{ letterSpacing: 0 }}
                      >
                        Visual
                      </span>
                      <br />
                      Curiosity to Creative
                      <br />
                      <span
                        className="font-kings font-normal"
                        style={{ letterSpacing: 0 }}
                      >
                        Autonomy
                      </span>
                    </h2>
                  </TextHighlight>
                  <TextAppear start="top 60%" end="top 30%">
                    <p
                      className="font-archivo font-medium text-[#6F6867] text-base"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      With 3.5 years of hands-on experience, I’ve grown from a
                      curious visual thinker into a strategic designer—shaping
                      brands, products, and digital experiences that perform.
                    </p>
                  </TextAppear>
                  <TextAppear start="top 60%" end="top 30%">
                    <p
                      className="font-archivo font-medium text-[#6F6867] text-base"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Blending form, function, and storytelling, I’ve built a
                      practice rooted in clarity, craft, and impact—across
                      UI/UX, branding, web, and content design.
                    </p>
                  </TextAppear>
                  <TextAppear start="top 60%" end="top 30%">
                    <p
                      className="font-archivo font-medium text-[#6F6867] text-base"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Now, I help brands, startups, and creators craft
                      meaningful, scalable design solutions—from interfaces and
                      identities to impactful content and visual systems.
                    </p>
                  </TextAppear>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SkillSection />

      <BlogSection />

      <div
        className="w-full h-[50px] absolute bottom-0 left-0"
        style={{
          backgroundImage: `url(${PageTorn.src})`,
          backgroundRepeat: "repeat-x",
          transform: "translateY(30px)",
        }}
      />
    </section>
  );
}
