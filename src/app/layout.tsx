import "swiper/css"
import "./styles/global.scss"
import type {Metadata, Viewport} from "next";
import Header from "@/components/header/Header";
import { Suspense } from 'react';
import ToTop from "@/components/to-top/ToTop";
import Footer from "@/components/footer/Footer";
import SmoothScrolling from "@/app/SmoothScrolling";
import Menu from "@/components/menu/Menu";
import Loading from './loading';
import Loader from "@/components/loader/Loader";
import Back from "@/components/back/Back";
import Cookie from "@/components/cookie/Cookie";
import dynamic from "next/dynamic";
const Metrika =dynamic(()=> import("@/app/Metrika"), {ssr: false})

export const viewport: Viewport= {
  width: "derive-width",
  height: "derive-height",
  initialScale: 1,
  maximumScale: 1
}
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
      <Suspense fallback={<Loading />}>
          <Menu/>
          <SmoothScrolling root noAnimation>
            {children}
            <Footer/>
          </SmoothScrolling>
      </Suspense>
      <Back/>
      <Cookie/>
      <Suspense>
        <Metrika/>
      </Suspense>
      <ToTop/>
      </body>
      </html>
  );
}