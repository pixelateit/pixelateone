// components/ThreeDSection.js
"use client";

import { useEffect, useRef, useState } from "react";

export default function ThreeDSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/threeDesign")
      .then((res) => res.json())
      .then((data) => {
        const preload = data.files.map((file) => {
          const img = new Image();
          img.src = file.url;
          img.dataset.name = file.name;
          return img;
        });
        setImages(preload);
      });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (images.length === 0) return;

    const config = {
      imageLifeSpan: 500,
      removalDelay: 50,
      mouseThreshold: 100,
      idleCursorInterval: 150,
      inDuration: 350,
      outDuration: 200,
      inEasing: "cubic-bezier(0.07, 0.5, 0.5, 1)",
      outEasing: "cubic-bezier(0.87, 0, 0.13, 1)",
    };

    const trail = [];
    let mouseX = 0,
      mouseY = 0,
      lastMouseX = 0,
      lastMouseY = 0,
      isMoving = false,
      lastRemovalTime = 0,
      lastSteadyImageTime = 0;

    const hasMovedEnough = () => {
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      return Math.sqrt(dx * dx + dy * dy) > config.mouseThreshold;
    };

    let currentIndex = 0;

    const createImage = () => {
      const cachedImg = images[currentIndex];
      currentIndex = (currentIndex + 1) % images.length;

      const img = cachedImg.cloneNode(true); // ✅ use cached image
      const rotation = (Math.random() - 0.5) * 50;

      img.className =
        "pointer-events-none absolute w-[200px] h-[200px] z-40 rounded-xl will-change-transform object-cover";

      const rect = container.getBoundingClientRect();
      const relativeX = mouseX - rect.left;
      const relativeY = mouseY - rect.top;

      img.style.left = `${relativeX}px`;
      img.style.top = `${relativeY}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

      container.appendChild(img);

      requestAnimationFrame(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      });

      trail.push({
        element: img,
        rotation,
        removalTime: Date.now() + config.imageLifeSpan,
      });
    };

    let inBounds = false;

    container.addEventListener("mouseenter", () => {
      inBounds = true;
    });

    container.addEventListener("mouseleave", () => {
      inBounds = false;
    });

    const createTrailImage = () => {
      if (isMoving && hasMovedEnough() && inBounds) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        createImage();
      }
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (now - lastRemovalTime < config.removalDelay || trail.length === 0)
        return;

      const oldestImage = trail[0];
      if (now >= oldestImage.removalTime) {
        const imgToRemove = trail.shift();

        imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
        imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;

        lastRemovalTime = now;
        setTimeout(() => {
          imgToRemove.element.remove();
        }, config.outDuration);
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      clearTimeout(window.moveTimeout);
      window.moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      createTrailImage();
      removeOldImages();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [images]);

  return (
    <div className="w-full z-20 overflow-hidden border-4 border-black">
      <div
        className="w-full flex flex-col items-center relative py-8 lg:py-32 overflow-hidden"
        ref={containerRef}
      >
        <div
          className="absolute -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.5) 90%, #000000 100%)",
            zIndex: 60,
          }}
        ></div>
        <div className="max-w-7xl w-full flex flex-col items-center py-16">
          <div className="flex flex-col items-center">
            <div className="bg-white/50 h-[140px] lg:h-[280px] w-[1px]"></div>
            <div className="bg-white/50 h-[1px] w-[40px] lg:w-[60px]"></div>
          </div>

          <div className="w-full mt-8 lg:mt-16">
            <div
              className="text-white w-full flex flex-col items-center font-oswald text-center"
              style={{
                fontSize: "clamp(120px, 12vw, 240px)",
                lineHeight: "clamp(80px, 8vw, 160px)",
                letterSpacing: "-0.04em",
              }}
            >
              <span>
                <span
                  className="font-kings"
                  style={{
                    fontSize: "clamp(120px, 12.5vw, 240px)",
                    lineHeight: "clamp(80px, 8.33vw, 160px)",
                    letterSpacing: "0em",
                  }}
                >
                  D
                </span>
                efine
              </span>
              <span className="z-50 text-shadow-[0px_20px_50px_rgba(0,0,0,0.8)]">
                <span
                  className="font-kings"
                  style={{
                    fontSize: "clamp(120px, 12.5vw, 240px)",
                    lineHeight: "clamp(80px, 8.33vw, 160px)",
                    letterSpacing: "0em",
                  }}
                >
                  D
                </span>
                esign
              </span>
              <span>
                <span
                  className="font-kings"
                  style={{
                    fontSize: "clamp(120px, 12.5vw, 240px)",
                    lineHeight: "clamp(80px, 8.33vw, 160px)",
                    letterSpacing: "0em",
                  }}
                >
                  D
                </span>
                eliver
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-16">
            <div className="bg-white/50 h-[1px] w-[40px] lg:w-[60px]"></div>
            <div className="bg-white/50 h-[140px] lg:h-[280px] w-[1px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
