'use client'
import React, {useEffect} from 'react';
import {usePathname} from "next/navigation";
import {useGetHashPosition} from "@/hoocs/useGetHashPosition";
import {smoothScroll} from "@/utils/smoothScroll";

const Scroll = () => {
  const pathname= usePathname()
  const getHashPosition= useGetHashPosition()

  useEffect(() => {
    console.log(pathname)

    window.scrollTo(0,0)
    setTimeout(()=>smoothScroll(getHashPosition(window.location.hash)), 200)
  }, [pathname]);
  return (
      <>

      </>
  );
};

export default Scroll;
