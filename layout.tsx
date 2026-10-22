import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], variable: "--f-display", axes: ["wdth"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "Johan J Jonex | Broadcast & Live Production Portfolio",
  description: "Broadcast professional: live streaming, switching, videography, drone, editing and design. Based in Chennai, India.",
};
export const viewport: Viewport = { themeColor: "#0c2a18", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
