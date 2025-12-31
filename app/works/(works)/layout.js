import BlurWindow from "@/components/BlurWindow";
import Header from "@/components/Header";

export const metadata = {
  title: "PIXELATE - Work",
};

export default function WorkLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <div
        id="smooth-wrapper"
        className="no-scrollbar overflow-hidden"
        style={{ zIndex: 5 }}
      >
        <div id="smooth-content">
          <Header theme="wob" />
          {children}
        </div>
      </div>
    </>
  );
}
