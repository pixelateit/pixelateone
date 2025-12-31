export default function BlurWindow() {
  return (
    <section
      className="w-full fixed bottom-0 left-0 right-0 h-[100px] lg:h-[160px] pointer-events-none"
      style={{ zIndex: 95 }}
    >
      <div className="w-full h-full relative">
        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[31] backdrop-blur-[0.5px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[32] backdrop-blur-[1px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[33] backdrop-blur-[2px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[34] backdrop-blur-[4px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[35] backdrop-blur-[8px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[36] backdrop-blur-[16px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[37] backdrop-blur-[32px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
          }}
        ></div>

        <div
          className="w-full h-[100px] lg:h-[160px] absolute bottom-0 inset-[0px] z-[38] backdrop-blur-[64px]"
          style={{
            maskImage:
              "linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
          }}
        ></div>
      </div>
    </section>
  );
}
