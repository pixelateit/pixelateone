import Noise from "@/public/home/NoiseLayer.png";

export default function NoiseLayer() {
  return (
    <section
      className="w-full h-screen pointer-events-none fixed top-0 left-0 right-0 bottom-0 bg-repeat opacity-35 mix-blend-overlay"
      style={{ backgroundImage: `url(${Noise.src})`, zIndex: 99999 }}
    ></section>
  );
}
