import TextAppear from "./TextAppear";
import TextHighlight from "./TextHighlight";

export default function Section4() {
  return (
    <section className="flex flex-col items-center justify-center w-full relative">
      <div className="flex flex-col container w-full max-w-7xl my-20">
        <div className="flex flex-col items-center gap-6">
          <TextHighlight opacity={0}>
            <h3 className="flex flex-row text-5xl">
              <span
                className="text-[#2D0F09] font-bold font-archivo-narrow"
                style={{ letterSpacing: "-0.05em", lineHeight: "30px" }}
              >
                About
              </span>
              <span
                className="text-[#2D0F09] font-kings"
                style={{ lineHeight: "36px" }}
              >
                Me
              </span>
            </h3>
          </TextHighlight>

          <div className="w-full p-5 relative">
            <TextAppear start="top 55%" end="top 5%">
              <h2
                className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                style={{
                  fontSize: "clamp(40px, 7vw, 100px)",
                  lineHeight: "clamp(38px, 6vw, 95px)",
                  letterSpacing: "-0.05em",
                  // background:
                  //   "radial-gradient(96.61% 397.64% at 0% 0%, #FFFFFF 45%, rgba(255, 255, 255, 0.1) 95%)",
                  // WebkitBackgroundClip: "text",
                  // backgroundClip: "text",
                  // color: "transparent",
                  // display: "inline-block",
                  textAlign: "center",
                  textTransparent: "true",
                }}
              >
                <span>We Are The Creative</span>
                {/* <br /> */}
                <span>Design Studio</span>
              </h2>
            </TextAppear>
          </div>
        </div>
        <div className="flex w-full h-screen"></div>
      </div>
    </section>
  );
}
