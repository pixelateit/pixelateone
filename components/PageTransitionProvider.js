// components/PageTransitionProvider.js
"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LongLogoBO from "@/public/home/logoLongB.svg";
import { gsap } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Image from "next/image";

export default function PageTransitionWrapper({ children }) {
  const overlayRef = useRef(null);
  const overlay2Ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [animating, setAnimating] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  // keep track of timeout
  const loadingTimerRef = useRef(null);

  // helper → start "Loading..." timer
  const startLoadingTimer = () => {
    clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => {
      setShowLoadingText(true);
    }, 2000); // appear after 2s
  };

  const stopLoadingTimer = () => {
    clearTimeout(loadingTimerRef.current);
    setShowLoadingText(false);
  };

  // 🔹 Entrance animation
  useGSAPAnimations({
    animations: [
      () => {
        if (!overlayRef.current || !overlay2Ref.current) return;

        startLoadingTimer();

        const tween = gsap.fromTo(
          [overlayRef.current, overlay2Ref.current],
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.inOut",
            onComplete: () => stopLoadingTimer(),
          }
        );

        return () => tween.kill();
      },
    ],
    dependencies: [pathname],
  });

  // 🔹 Exit animation
  useEffect(() => {
    window.triggerPageTransition = (href) => {
      if (
        !overlayRef.current ||
        !overlay2Ref.current ||
        animating ||
        href === pathname
      )
        return;

      setAnimating(true);
      stopLoadingTimer();

      const overlayEl = overlayRef.current;
      const overlay2El = overlay2Ref.current;

      const tl = gsap.timeline({
        onComplete: () => setAnimating(false),
      });

      tl.fromTo(
        [overlay2El, overlayEl],
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.inOut",
          onStart: () => startLoadingTimer(), // start timer during exit
          onComplete: () => {
            if (href != "") {
              return router.push(href);
            } else {
              return router.back();
            }
          },
        }
      );
    };

    return () => {
      delete window.triggerPageTransition;
      clearTimeout(loadingTimerRef.current);
    };
  }, [animating, pathname, router]);

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Overlay 1: White with logo */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex justify-center items-center"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="w-fit h-fit flex flex-col gap-8 items-center">
          <Image
            src={LongLogoBO}
            alt="Pixelate.one"
            height={28}
            className="h-7 w-auto aspect-auto"
          />
          {showLoadingText && (
            <div className="font-archivo font-medium text-[#4a4b4d] text-center text-base animate-pulse">
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Overlay 2: Gradient background */}
      <div
        ref={overlay2Ref}
        className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(114%_100%_at_50%_100%,_#FF3F2B_36%,_#E00E15_67%,_#750000_100%)] z-[9998]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Page content */}
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
