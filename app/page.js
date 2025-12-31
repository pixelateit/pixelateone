import Home from "@/components/Home";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import HomeSideMenus from "@/components/HomeSideMenus";
import BlurWindow from "@/components/BlurWindow";

export default function Page() {
  return (
    <>
      <HomeSideMenus />
      <BlurWindow />
      <Header />
      <div
        id="smooth-wrapper"
        className="overflow-x-hidden w-full"
        style={{ zIndex: 5 }}
      >
        <div id="smooth-content">
          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
}
