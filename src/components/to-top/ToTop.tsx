import React, {useEffect, useState} from 'react';
import "./to-top.scss"
import {ReactSVG} from "react-svg";
import {smoothScroll} from "@/utils/smoothScroll";
import {debounce} from "next/dist/server/utils";
import {useGetRem} from "@/hoocs/useGetRem";

const ToTop = () => {
  const rem= useGetRem()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleScroll= debounce(()=>{
      setIsShow(window.scrollY>=50*rem)
    }, 200)

    window.addEventListener("scroll", handleScroll)

    return ()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);
  return (
      <button className="to-top" onClick={()=> smoothScroll(-window.scrollY)} style={{display: isShow? "flex":"none"}}>
        <ReactSVG src="/Assets/Icons/arrow.svg"/>
      </button>
  );
};

export default ToTop;
