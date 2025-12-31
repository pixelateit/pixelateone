"use client";

import { useEffect, useRef } from "react";

export default function TextScramble({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const randomChars = "!@#$%^&*()_+-<>?";
    const originalText = element?.textContent;

    const handleMouseOver = () => {
      let iterations = 0;
      const interval = setInterval(() => {
        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) return char;
            return randomChars.charAt(
              Math.floor(Math.random() * randomChars.length)
            );
          })
          .join("");

        if (iterations >= originalText.length) {
          clearInterval(interval);
        }

        iterations += 1 / 3;
      }, 20);
    };

    if (element) {
      element.dataset.text = originalText;
      element.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, []);

  return <span ref={ref}>{children}</span>;
}
