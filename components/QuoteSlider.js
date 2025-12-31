"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import QIMG from "@/public/qimg.webp";
import { usePathname } from "next/navigation";

// const slides = [
//   {
//     image: QIMG,
//     quote:
//       "Good design is as little design as possible. Emphasizing purposeful simplicity, where design and function are distilled to their essence.",
//     author: "Dieter Rams",
//   },
//   {
//     image: QIMG, // replace with another
//     quote:
//       "Design is not just what it looks like and feels like. Design is how it works.",
//     author: "Steve Jobs",
//   },
//   {
//     image: QIMG, // replace with another
//     quote: "Styles come and go. Good design is a language, not a style.",
//     author: "Massimo Vignelli",
//   },
// ];

export default function QuoteSlider() {
  const [current, setCurrent] = useState(0);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "/api/quotes?fields=quote,quotee,image&active=true"
        );
        const data = await res.json();
        setQuotes(data.quotes);
      } catch (err) {
        console.error("Error fetching quotes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [pathname]);

  useEffect(() => {
    if (!quotes.length) return;

    // Wait for refs to be mounted
    if (!progressRef.current || !textRef.current || !imageRef.current) return;

    // Reset previous interval
    clearInterval(intervalRef.current);

    // Restart progress bar
    gsap.fromTo(
      progressRef.current,
      { width: 0 },
      { width: "100%", duration: 5, ease: "linear" }
    );

    // Fade-in
    gsap.fromTo(
      [textRef.current, imageRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    // Auto-slide
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [current, quotes]);

  return (
    <div className="w-full p-2.5 relative">
      <div
        className="w-full h-[540px] flex flex-row overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2E2323 0%, #3F0E00 80%)",
        }}
      >
        {!loading && quotes.length > 0 ? (
          (() => {
            const quote = quotes[current];

            return (
              <div key={quote._id} className="w-full flex flex-row">
                <div className="w-full h-full">
                  <Image
                    ref={imageRef}
                    key={current + "-img"}
                    src={quote.image || QIMG}
                    width={900}
                    height={540}
                    alt="quote background"
                    className="w-full h-full object-cover"
                    style={{
                      clipPath:
                        "polygon(20% 0, 60% 10%, 100% 50%, 85% 100%, 0 100%, 0 0)",
                    }}
                  />
                </div>

                <div className="w-full h-full flex items-center justify-center">
                  <div
                    ref={textRef}
                    key={current + "-text"}
                    className="max-w-[720px] flex flex-col items-center gap-8"
                  >
                    <div className="w-full flex flex-col gap-2 items-center">
                      <h2
                        className="w-full font-oswald font-semibold text-white uppercase text-center"
                        style={{
                          fontSize: "clamp(18px, 2vw, 36px)",
                          lineHeight: "clamp(18px, 2vw, 36px)",
                          letterSpacing: "-0.05em",
                        }}
                      >
                        {quote.quote}
                      </h2>
                      <span className="text-xl text-center">
                        <span className="font-kings text-white/40 font-normal">
                          Quote by
                        </span>{" "}
                        <span className="font-archivo-narrow font-semibold text-white/80">
                          {quote.quotee}
                        </span>
                      </span>
                    </div>

                    <div className="w-[80px] h-[5px] bg-black/40 rounded-full overflow-hidden">
                      <div ref={progressRef} className="h-full bg-white w-0" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-xl">Loading quotes...</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
    </div>
  );
}
