import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tsehay Campus - Master Digital Skills",
  description: "Ethiopia's Leading AI-Powered E-Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
        {/* Global Subtle Golden Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F9B03C] rounded-full blur-[150px] opacity-0 dark:opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none z-0 hidden dark:block fixed"></div>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <AuthProvider>
              <div className="relative z-10 flex flex-col min-h-screen">
                {children}
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
