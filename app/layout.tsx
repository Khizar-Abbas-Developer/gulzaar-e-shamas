import type { Metadata } from "next";
import { IoLogoWhatsapp } from "react-icons/io";
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
  title: "Gulzar-e-shams",
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
            <PersistGateProvider>
              {children}

              <div className="flex flex-col items-end gap-2">
                {/* WhatsApp icon → visible everywhere */}
                <a
                  href="https://wa.link/tgnrg4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-50 block fixed bottom-8 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg transition duration-300"
                >
                  <IoLogoWhatsapp className="text-4xl" />
                </a>

                {/* Contact text → only show on lg and above */}
                <p className="hidden lg:block z-10 font-bold rounded-tl-2xl rounded-bl-2xl fixed bottom-9 right-[71px] bg-green-500 text-white p-3 shadow-lg transition duration-300">
                  {`${"Contact"}.`}
                </p>
              </div>
            </PersistGateProvider>
          </ReduxToolkitProvider>
        </ThemeProvider>

        <div className="text-14-regular mt-6 flex justify-center items-center mb-6">
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
