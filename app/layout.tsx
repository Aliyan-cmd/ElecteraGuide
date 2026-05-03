import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { UserProgressProvider } from "@/components/UserProgressContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ElectraGuide | India's #1 Election Assistant",
  description: "A premium AI-powered platform for the Indian voter. Learn how to vote, track your constituency, and ask questions in English & Hindi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-outfit)]">
        <LanguageProvider>
          <ThemeProvider>
            <UserProgressProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </UserProgressProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
