'use client'
import React, {useEffect} from 'react';
import {usePathname} from "next/navigation";
import {useGetHashPosition} from "@/hoocs/useGetHashPosition";
import {smoothScroll} from "@/utils/smoothScroll";

const Scroll = () => {
  const pathname= usePathname()
  const getHashPosition= useGetHashPosition()

  useEffect(() => {
    window.scrollTo(0,0)
    setTimeout(()=>smoothScroll(getHashPosition(window.location.hash)), 1000)
  }, [pathname]);
  return (
      <>

      </>
  );
};

export default Scroll;
