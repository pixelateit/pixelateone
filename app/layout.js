import { Oswald, Kings, Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/context/SmoothScroll";
import PageTransitionWrapper from "@/components/PageTransitionProvider";
import NoiseLayer from "@/components/NoiseLayer";
import AuthProviders from "@/components/authProviders";
import FirebaseAnalyticsProvider from "@/components/FirebaseAnalyticsProvider";

const kings = Kings({
  variable: "--font-kings",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "normal",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "PIXELATE | Prakhar Srivastava",
  description: "Portfolio website of Prakhar Srivastava",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kings.variable} ${oswald.variable} ${archivo.variable} ${archivoNarrow.variable} antialiased relative h-auto no-scrollbar`}
      >
        <FirebaseAnalyticsProvider />
        <PageTransitionWrapper>
          <SmoothScroll />
          <NoiseLayer />
          <AuthProviders>{children}</AuthProviders>
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
