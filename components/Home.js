import Hero from "@/components/hero";
import Section2 from "@/components/section2";
import Section3 from "@/components/section3";
import Section4 from "@/components/section4";

export default function Home() {
  return (
    <div className="bg-white z-[2] relative shadow-[0_12px_40px_0_rgba(0,0,0,0.10)]">
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}
