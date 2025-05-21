"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import signatureImg from "@/public/home/Signature.svg";

export default function SigFollow() {
  const containerRef = useRef(null);
  const signatureRef = useRef(null);
  const quickToX = useRef(null);
  const quickToY = useRef(null);

  useLayoutEffect(() => {
    const sigEl = signatureRef.current;

    quickToX.current = gsap.quickTo(sigEl, "left", {
      duration: 0.3,
      ease: "power2.out",
    });

    quickToY.current = gsap.quickTo(sigEl, "top", {
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    quickToX.current(x);
    quickToY.current(y);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-9 flex items-center justify-center w-full">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() =>
          gsap.to(signatureRef.current, { autoAlpha: 1, duration: 0.3 })
        }
        onMouseLeave={() =>
          gsap.to(signatureRef.current, { autoAlpha: 0, duration: 0.3 })
        }
        className="relative w-full h-full"
      >
        <Image
          ref={signatureRef}
          src={signatureImg.src}
          alt="Signature"
          width={270}
          height={94}
          className="pointer-events-none absolute w-48 h-auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}
