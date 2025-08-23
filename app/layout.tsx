import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReduxToolkitProvider, {
  PersistGateProvider,
} from "@/redux/reduxProvider";

import { ThemeProvider } from "@/lib/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const fontUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"], // Urdu falls under Arabic script subset
  weight: ["400"], // adjust if you need bold, etc.
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  title: "Carepulse",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 antialiased",
          fontSans.variable,
          fontUrdu.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ReduxToolkitProvider>
            <PersistGateProvider>{children}</PersistGateProvider>
          </ReduxToolkitProvider>
        </ThemeProvider>

        <div className="text-14-regular mt-20 flex justify-center items-center">
          <div className="text-dark-600 flex flex-row-reverse justify-center items-center gap-2 font-urdu">
            <p>2025</p>
            <p>گلزارِ شمس تبریزؒ</p>
            <p>©</p>
          </div>
        </div>
      </body>
    </html>
  );
}
