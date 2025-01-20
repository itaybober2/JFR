import "@/styles/global.css";
import "@/styles/splash-screen.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
// import Navbar from "@/lib/components/Navbar";
import FloatingPlusButton from "@/app/src/components/FloatingPlusButton";
import SplashScreen from "@/app/src/components/SplashScreen";
import FooterNavBar from "@/lib/components/FooterNavbar";

export const metadata: Metadata = {
    title: "JFR",
    description: "A social transportation app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {

    return (
        <html dir="rtl">
            <head>
                {/* Browser Favicon */}
                <link rel="icon" href="/icons/JFR_logo%20_32.png" />
                {/* Apple Icon */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/JFR_logo_180.png"
                />
                {/* Android Icon */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/icons/JFR_logo_192.png"
                />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body>
                <SplashScreen />
                {/* Pass the state and setter to Navbar */}
                {/* <Navbar toMountScoupe={toMountScoupe} setToMountScoupe={setToMountScoupe} /> */}
                <div>{children}</div>
                {/* <FloatingPlusButton /> */}
                <FooterNavBar/>
            </body>
        </html>
    );
}
