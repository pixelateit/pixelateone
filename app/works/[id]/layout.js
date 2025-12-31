import BlurWindow from "@/components/BlurWindow";
import Header from "@/components/header";

export default function WorkPageLayout({ children }) {
  return (
    <>
      <BlurWindow />
      <Header theme="wob" />
      {children}
    </>
  );
}
