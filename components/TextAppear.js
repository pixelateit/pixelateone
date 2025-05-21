"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function TextAppear({
  children,
  classname,
  start,
  end,
  splittype,
}) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = new SplitText(ref.current, {
      type: "chars, words",
    });

    let splitText;
    if (splittype == "chars") {
      splitText = split.chars;
    } else {
      splitText = split.words;
    }

    gsap.from(splitText, {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: start || "top 65%",
        end: end || "top 20%",
        scrub: true,
        markers: false,
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [end, start, splittype]);

  return (
    <span className={classname} ref={ref}>
      {children}
    </span>
  );
}
