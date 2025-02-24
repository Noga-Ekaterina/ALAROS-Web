'use client'
import React, {useEffect} from 'react';
import {IWithChildren} from "@/types/tehnic";
import {usePathname, useSearchParams} from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {observer} from "mobx-react-lite";
import ToTop from "@/components/to-top/ToTop";

const App = ({children}:IWithChildren) => {

  return (
      <>
        <Header/>
        {children}
        <Footer/>
        <ToTop/>
      </>
  );
};

export default observer(App);
