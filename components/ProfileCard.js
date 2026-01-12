import Image from "next/image";
import PaperTexture from "@/public/home/PaperTexture.webp";
import PageTorn from "@/public/home/pageTorn2.webp";

export default function ProfileCard({
  cardData,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  function formattedDate(date) {
    if (!date) {
      return "-"; // Handle null/invalid input gracefully
    }

    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit", // Use '2-digit' for MM
      day: "2-digit", // Use '2-digit' for DD
    });
  }
  return (
    <>
      <section className="w-full px-6 pb-20 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row gap-1">
        {cardData.map(
          ({
            _id,
            id,
            company,
            title,
            description,
            software,
            date,
            thumbnail,
            sliderImages,
          }) => {
            const isFeatured = (id - 3) % 12 === 0 || (id - 10) % 12 === 0;
            return (
              <div
                key={_id}
                className={
                  "flex w-full cursor-none" +
                  (isFeatured ? " md:col-span-2 md:row-span-2" : "")
                }
              >
                <div
                  className={`flex flex-col items-center relative justify-between w-full aspect-square transition-all duration-300 rounded-[5px] overflow-hidden cursor-none`}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onClick={() =>
                    onClick({
                      _id,
                      id,
                      company,
                      title,
                      description,
                      software,
                      date,
                      thumbnail,
                      sliderImages,
                    })
                  }
                >
                  <Image
                    src={thumbnail}
                    width={300}
                    height={425}
                    alt={company}
                    className="w-full h-full transition-all duration-300 object-cover hover-image scale-100"
                  />
                  <div
                    className="w-full h-full flex justify-center items-center absolute top-0 left-0 backdrop-blur-[0px] pointer-events-none hover-card opacity-0"
                    style={{
                      zIndex: 1,
                      background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%)",
                    }}
                  >
                    <div
                      className="w-[360px] h-[380px] p-5 flex flex-col justify-between bg-white relative hover-desc"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        opacity: 0,
                      }}
                    >
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="w-fit flex flex-row items-center gap-1">
                          <span
                            className="w-fit font-oswald font-medium text-base uppercase text-[#242222] transition-all duration-300"
                            style={{ letterSpacing: "-0.02em" }}
                          >
                            {company}
                          </span>
                        </div>
                        <div className="w-fit flex flex-row items-center gap-1">
                          <span
                            className="w-fit font-oswald font-medium text-base uppercase text-[#242222] transition-all duration-300"
                            style={{ letterSpacing: "-0.04em" }}
                          >
                            {formattedDate(date)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-auto">
                        <h5
                          className="w-full font-archivo font-bold text-lg text-[#242222]"
                          style={{
                            letterSpacing: "-0.02em",
                            lineHeight: "1.2em",
                          }}
                        >
                          {title}
                        </h5>
                        <p
                          className="w-full mt-3 font-archivo font-normal text-base text-[#242222]/50"
                          style={{
                            lineHeight: "1.25em",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {description}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span
                          className="font-oswald font-normal text-base uppercase text-[#242222] transition-all duration-300"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          CP-{id}
                        </span>
                        <span className="font-kings font-normal text-base text-[#242222] transition-all duration-300">
                          Made in{" "}
                          <span
                            className="font-oswald font-medium uppercase"
                            style={{ letterSpacing: "-0.02em" }}
                          >
                            {software}
                          </span>
                        </span>
                      </div>
                      <Image
                        src={PaperTexture}
                        alt="overlay"
                        width="100%"
                        height="100%"
                        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-cover object-cover pointer-events-none"
                        style={{ opacity: 0.1, zIndex: 0 }}
                      />
                      <div
                        className="w-full h-[50px] absolute bottom-0 left-0"
                        style={{
                          backgroundImage: `url(${PageTorn.src})`,
                          backgroundRepeat: "repeat-x",
                          transform: "translateY(30px)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </section>
    </>
  );
}
