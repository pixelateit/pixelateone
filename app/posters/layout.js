import Header from "@/components/header";
import Footer from "@/components/Footer";
import BlurWindow from "@/components/BlurWindow";

export const metadata = {
  title: "PIXELATE - MyPosters",
  description: "Collection of my posters made since 2023",
};

export default function PostersLayout({ children }) {
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
