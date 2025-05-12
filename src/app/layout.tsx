import "swiper/css"
import "./styles/global.scss"
import type { Metadata } from "next";
import Header from "@/components/header/Header";
import { Suspense } from 'react';
import ToTop from "@/components/to-top/ToTop";
import Scroll from "@/app/Scroll";
import Footer from "@/components/footer/Footer";
import SmoothScrolling from "@/app/SmoothScrolling";
import AnimationPage from "@/app/AnimationPage";
import Menu from "@/components/menu/Menu";
import Loading from './loading';
import Loader from "@/components/loader/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body>
      <Loader isClient/>
      <Header/>
      <Menu/>
      <Suspense fallback={<Loading />}>
          <SmoothScrolling root={true}>
            {children}
            <Footer/>
          </SmoothScrolling>
      </Suspense>
      <ToTop/>
      <Scroll/>
      </body>
      </html>
  );
}