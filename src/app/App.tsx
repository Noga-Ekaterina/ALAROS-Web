'use client'
import React, {useEffect} from 'react';
import {IWithChildren} from "@/types/tehnic";
import {usePathname, useSearchParams} from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import pagesData from "@/store/pagesData";
import {observer} from "mobx-react-lite";

const App = ({children}:IWithChildren) => {

  return (
      <>
        <Header/>
        {children}
        <Footer/>
      </>
  );
};

export default observer(App);
