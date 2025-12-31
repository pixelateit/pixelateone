import BlurWindow from "@/components/BlurWindow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "PIXELATE - About",
};

export default function AboutLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      <div id="smooth-wrapper" className="no-scrollbar" style={{ zIndex: 5 }}>
        <div id="smooth-content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
