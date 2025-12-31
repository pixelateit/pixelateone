import BlurWindow from "@/components/BlurWindow";
import Footer from "@/components/Footer";
import Header from "@/components/header";

export const metadata = {
  title: "PIXELATE - Company Profiles/Pitch Decks",
};

export default function ProfileLayout({ children }) {
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
