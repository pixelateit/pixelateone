import MyImage from "@/public/home/MyImage.webp";
export default function Hero() {
  return (
    <section
      className="w-full flex flex-col justify-center min-h-screen bg-cover bg-center items-center"
      style={{
        backgroundImage: `url(${MyImage.src})`,
        backgroundPosition: "top",
      }}
    >
      <div className="max-w-7xl container flex flex-col items-center pb-40">
        <div className="flex items-center min-h-screen max-h-[1080px] pb-4">
          <h1 className="flex flex-col items-center mt-auto">
            <span className="flex flex-row gap-6 ms-3">
              <span
                className=" font-kings text-white"
                style={{
                  fontSize: "clamp(100px, 12vw, 220px)",
                  lineHeight: "clamp(90px, 10vw, 180px)",
                }}
              >
                Creativity
              </span>
              <span
                className=" font-archivo italic text-white/80 h-auto"
                style={{
                  fontSize: "clamp(60px, 7vw, 112px)",
                  lineHeight: "clamp(70px, 9vw, 132px)",
                  letterSpacing: "-0.04em",
                  // backdropFilter: "blur(36px)",
                  // WebkitBackdropFilter: "blur(36px)",
                }}
              >
                is my
              </span>
            </span>
            <span className="flex flex-row gap-6 me-3 relative top-[-20px]">
              <span
                className=" font-archivo italic text-white/80 h-auto"
                style={{
                  fontSize: "clamp(60px, 7vw, 112px)",
                  lineHeight: "clamp(70px, 9vw, 132px)",
                  letterSpacing: "-0.04em",
                  // backdropFilter: "blur(36px)",
                  // WebkitBackdropFilter: "blur(36px)",
                }}
              >
                connection with
              </span>
              <span
                className=" font-kings text-white"
                style={{
                  fontSize: "clamp(100px, 12vw, 220px)",
                  lineHeight: "clamp(90px, 10vw, 180px)",
                }}
              >
                Gods
              </span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white/50 h-[1px] w-[80px]"></div>
          <div className="bg-white/50 h-[320px] w-[1px]"></div>
          <div className="bg-white/50 h-[1px] w-[40px]"></div>
        </div>

        <div className="flex flex-col items-center gap-10 mt-20">
          <h3 className="flex flex-row text-5xl">
            <span
              className="text-white font-archivo-narrow"
              style={{ letterSpacing: "-0.05em", lineHeight: "30px" }}
            >
              My
            </span>
            <span
              className="text-white/50 font-kings"
              style={{ lineHeight: "36px" }}
            >
              Approach
            </span>
          </h3>
          <p
            className="text-white/50 font-oswald uppercase font-semibold text-center"
            style={{
              fontSize: "clamp(40px, 4vw, 70px)",
              lineHeight: "clamp(40px, 4vw, 70px)",
              letterSpacing: "-0.04em",
            }}
          >
            Whether you're launching a blog, building an e-commerce platform, or
            creating a niche community,
            <span className="text-white">
              {" "}
              I bring the digital expertise to make your vision stand out
            </span>{" "}
            with clarity, impact, and precision.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <svg className="absolute w-0 h-0">
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 12 -5"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </svg>
        <div className="flex flex-col w-full" style={{ filter: "url(#gooey)" }}>
          <div className="flex felx-row justify-between">
            <div className="bg-white w-60 h-8 rounded-tr-md"></div>
            <div className="bg-white w-60 h-8 rounded-tl-md"></div>
          </div>
          <div className="flex felx-row justify-between">
            <div className="bg-white w-80 h-8 rounded-tr-md"></div>
            <div className="bg-white w-80 h-8 rounded-tl-md"></div>
          </div>
          <div className="flex felx-row justify-between">
            <div className="bg-white w-md h-8 rounded-tr-md"></div>
            <div className="bg-white w-md h-8 rounded-tl-md"></div>
          </div>
          <div className="bg-white w-full h-2"></div>
        </div>
      </div>
    </section>
  );
}
