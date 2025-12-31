import BlurWindow from "@/components/BlurWindow";
import Header from "@/components/Header";

export default function WorkPageLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      {children}
    </>
  );
}
