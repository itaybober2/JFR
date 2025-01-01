import "@/styles/global.css";
import "@/styles/splash-screen.css"; // Import the splash screen CSS

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import FloatingPlusButton from "@/src/components/FloatingPlusButton";

export const metadata: Metadata = {
    title: "JFR",
    description:
        "A social transportation app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html dir="rtl">
        <head>
            {/* Browser Favicon */}
            <link rel="icon" href="/icons/favicon.png" />
            {/* Apple Icon */}
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icons/icon-180.png"
            />
            {/* Android Icon */}
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/icons/icon-192.png"
            />
            <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
        <div className="splash-screen">
            <img src="/icons/JFR_logo.svg" alt="JFR Logo" />
        </div>
        <Navbar />
        <div>{children}
            <FloatingPlusButton/>
        </div>
        <Footer />
        <script>
            {`
            // Remove splash screen after a delay
            setTimeout(() => {
              document.querySelector('.splash-screen').style.display = 'none';
            }, 3000); // Adjust the delay as needed
          `}
        </script>
        </body>
        </html>
    );
}