import "swiper/css"
import "./styles/global.scss"
import type { Metadata } from "next";
import Header from "@/components/header/Header";
import { AnimatePresence } from "framer-motion";
import ToTop from "@/components/to-top/ToTop";
import Scroll from "@/app/Scroll";
import React from "react";
import Footer from "@/components/footer/Footer";
import SmoothScrolling from "@/app/SmoothScrolling";
import AnimationPage from "@/app/AnimationPage";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header/>
        <AnimationPage>
          <SmoothScrolling root={true}>
            {children}
            <Footer/>
            <ToTop/>
            <Scroll/>
          </SmoothScrolling>
        </AnimationPage>
      </body>
    </html>
  );
}
