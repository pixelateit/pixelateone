import Header from "@/components/header";
import Footer from "@/components/Footer";
import BlurWindow from "@/components/BlurWindow";

export default function BlogLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="dark" />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
