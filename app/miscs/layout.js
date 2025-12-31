import Header from "@/components/header";
import Footer from "@/components/Footer";
import BlurWindow from "@/components/BlurWindow";

export const metadata = {
  title: "PIXELATE - Miscellaneous",
  description: "Collection of Miscellaneous works",
};

export default function MiscellaneousLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      <div id="smooth-wrapper" style={{ zIndex: 5 }}>
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
