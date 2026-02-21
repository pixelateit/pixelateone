import Header from "@/components/header";
import PageLink from "@/components/PageLink";
import Three404 from "@/components/Three404";
import { ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <Header theme="wob" />
      <Three404 />

      <div className="absolute bottom-20 w-full text-center flex flex-col items-center justify-center gap-4">
        <p className="text-white text-lg font-archivo-narrow font-bold uppercase">
          Page Not Found
        </p>
        <PageLink
          className="px-6 py-3 rounded-lg bg-[#181818] flex gap-2 items-center text-white font-archivo-narrow uppercase text-base font-semibold hover:bg-[#242424] transition-all duration-150"
          href="/"
        >
          <ArrowLeftIcon className="text-white w-5 h-5" />
          <span>Go Back!</span>
        </PageLink>
      </div>
    </div>
  );
}
