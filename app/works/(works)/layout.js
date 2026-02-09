import BlurWindow from "@/components/BlurWindow";
import Header from "@/components/header";

export const metadata = {
  title: "PIXELATE - Work",
};

export default function WorkLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      <div
        id="smooth-wrapper"
        className="no-scrollbar overflow-hidden"
        style={{ zIndex: 5 }}
      >
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
