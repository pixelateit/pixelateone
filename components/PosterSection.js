"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Posters } from "@/public/home/posters/index.js";
import styles from "../app/work/InfiniteCoverflow.module.css"; // Adjust the path as needed

/**
 * Infinite 3D coverflow carousel using HTML, CSS, and JS (no Three.js)
 */
export default function PosterSection() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(null);

  const images = Posters.map((p) => p.src);
  const total = images.length;
  const SPACING = 100; // px between cards
  const SCROLL_FACTOR = 1; // wheel scroll sensitivity
  const SELECT_SCALE = 1.5;
  const ROTATE_ANGLE = -40; // increased skew angle

  // Handle wheel only when not selected
  useEffect(() => {
    const onWheel = (e) => {
      if (selected === null) {
        setOffset((prev) => prev + e.deltaY * SCROLL_FACTOR);
      }
      e.preventDefault();
    };
    const el = containerRef.current;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [selected]);

  // Wrap horizontal offset for infinite scroll
  const wrap = (x) => {
    const width = total * SPACING;
    return ((x % width) + width) % width;
  };

  // If an item is selected, center it
  const effectiveOffset =
    selected !== null ? (selected - total / 2) * SPACING : offset;

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.scene}>
        {images.map((src, i) => {
          // base position
          const baseX = (i - total / 2) * SPACING;
          // apply offset
          let x = baseX - effectiveOffset;
          x = wrap(x + (total / 2) * SPACING) - (total / 2) * SPACING;

          // transform for each card
          const isSelected = i === selected;
          const translateX = x;
          const rotateY = isSelected ? 0 : ROTATE_ANGLE;
          const scale = isSelected ? SELECT_SCALE : 1;
          const zIndex = Math.round(-Math.abs(x));

          return (
            <div
              key={i}
              className={styles.card}
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                transformStyle: "preserve-3d",
              }}
              onClick={() => setSelected(isSelected ? null : i)}
            >
              <Image
                src={src}
                alt={`Poster ${i}`}
                width={240}
                height={405}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
