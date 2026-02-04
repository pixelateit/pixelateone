import BlurWindow from "@/components/BlurWindow";
import Header from "@/components/header";

export default function WorkPageLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
