import Header from "@/components/header";
import Footer from "@/components/Footer";
import BlurWindow from "@/components/BlurWindow";

export const metadata = {
  title: "PIXELATE - MyBlogs",
  description: "Deep Dive, Experiments & Visual Explorations",
};

export default function BlogsLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      <div id="smooth-wrapper" style={{ zIndex: 5 }}>
        <div id="smooth-content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
