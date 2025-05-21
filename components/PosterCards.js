"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { Posters } from "@/public/home/posters/index.js";

export default function PosterCards() {
  const post1 = useRef(null);
  const post2 = useRef(null);
  const post3 = useRef(null);
  const post4 = useRef(null);
  const post5 = useRef(null);
  const post6 = useRef(null);
  const post7 = useRef(null);
  const post8 = useRef(null);
  const post9 = useRef(null);
  const post10 = useRef(null);
  const post11 = useRef(null);
  const post12 = useRef(null);
  const post13 = useRef(null);
  const post14 = useRef(null);
  const divW = useRef(null);

  useEffect(() => {
    const posters = [
      post1.current,
      post2.current,
      post3.current,
      post4.current,
      post5.current,
      post6.current,
      post7.current,
      post8.current,
      post9.current,
      post10.current,
      post11.current,
      post12.current,
      post13.current,
      post14.current,
    ];

    gsap.registerPlugin(ScrollTrigger, Draggable);

    const tl2 = gsap.timeline();

    tl2
      .fromTo(
        post1.current,
        { top: "50%", left: "41%", rotate: "4.2deg" },
        { top: "54%", left: "78%", rotate: "41deg" },
        0
      )
      .fromTo(
        post2.current,
        { top: "50%", left: "41%", rotate: "-20deg" },
        { top: "58%", left: "35%", rotate: "-20deg" },
        0
      )
      .fromTo(
        post3.current,
        { top: "50%", left: "41%", rotate: "9.7deg" },
        { top: "60%", left: "60%", rotate: "19deg" },
        0
      )
      .fromTo(
        post4.current,
        { top: "50%", left: "41%" },
        { top: "48%", left: "38%", rotate: "0deg" },
        0
      )
      .fromTo(
        post5.current,
        { top: "50%", left: "41%", rotate: "15.5deg" },
        { top: "50%", left: "65%", rotate: "20deg" },
        0
      )
      .fromTo(
        post6.current,
        { top: "50%", left: "41%", rotate: "-4.5deg" },
        { top: "28%", left: "36%", rotate: "-14deg" },
        0
      )
      .fromTo(
        post7.current,
        { top: "50%", left: "41%", rotate: "-16deg" },
        { top: "40%", left: "9%", rotate: "-22deg" },
        0
      )
      .fromTo(
        post8.current,
        { top: "50%", left: "41%", rotate: "-8deg" },
        { top: "28%", left: "11%", rotate: "-8.5deg" },
        0
      )
      .fromTo(
        post9.current,
        { top: "50%", left: "41%", rotate: "-18deg" },
        { top: "15%", left: "14%", rotate: "-21deg" },
        0
      )
      .fromTo(
        post10.current,
        { top: "50%", left: "41%", rotate: "20deg" },
        { top: "28%", left: "70%", rotate: "26deg" },
        0
      )
      .fromTo(
        post11.current,
        { top: "50%", left: "41%", rotate: "8deg" },
        { top: "18%", left: "52%", rotate: "8deg" },
        0
      )
      .fromTo(
        post12.current,
        { top: "50%", left: "41%", rotate: "-5.25deg" },
        { top: "5%", left: "35%", rotate: "-5.25deg" },
        0
      )
      .fromTo(
        post13.current,
        { top: "50%", left: "41%", rotate: "-12deg" },
        { top: "52%", left: "8%", rotate: "-37deg" },
        0
      )
      .fromTo(
        post14.current,
        { top: "50%", left: "41%", rotate: "17deg" },
        { top: "40%", left: "75%", rotate: "32deg" },
        0
      );

    ScrollTrigger.create({
      animation: tl2,
      duration: 0.5,
      trigger: divW.current,
      start: "60% 60%",
      toggleActions: "play none none none",
      // scrub: true,
      markers: false,
    });

    posters.forEach((poster) => {
      Draggable.create(poster, {
        type: "x,y",
        // edgeResistance: 0.05,
        bounds: "#dragZone", // Replace with the ID/class of your boundary container
        inertia: true,
      });
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-[1080px] relative" ref={divW}>
      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-14"
        ref={post1}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[0]}
          alt={`Poster 1`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-12"
        ref={post2}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[1]}
          alt={`Poster 2`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-11"
        ref={post3}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[2]}
          alt={`Poster 3`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-10"
        ref={post4}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[3]}
          alt={`Poster 4`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-9"
        ref={post5}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[4]}
          alt={`Poster 5`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-8"
        ref={post6}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[5]}
          alt={`Poster 6`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-6"
        ref={post7}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[6]}
          alt={`Poster 7`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-5"
        ref={post8}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[7]}
          alt={`Poster 8`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-4"
        ref={post9}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[8]}
          alt={`Poster 9`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-3"
        ref={post10}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[9]}
          alt={`Poster 10`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-2"
        ref={post11}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[10]}
          alt={`Poster 11`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-1"
        ref={post12}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[11]}
          alt={`Poster 12`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-13"
        ref={post13}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[12]}
          alt={`Poster 13`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>

      <div
        className="w-fit absolute translate-[-50%, -50%] rounded-[5px] bg-black z-7"
        ref={post14}
        style={{ boxShadow: "0px 32px 64px -12px #000000CC" }}
      >
        <Image
          src={Posters[13]}
          alt={`Poster 14`}
          loading="lazy"
          className="max-w-[270px] aspect-auto grow rounded-[5px]"
        />
      </div>
    </div>
  );
}
