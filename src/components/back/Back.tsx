'use client'
import React from 'react';
import "./back.scss"
import {usePathname, useRouter} from "next/navigation";
import {ReactSVG} from "react-svg";
import store from "@/store/store";

const Back = () => {
  const pathname= usePathname()
  const router= useRouter()
  const {setIsBack}=store

  if (pathname==="/") return null

  return (
      <button
          className="btn-round back"
          onClick={() => {
            setIsBack(true)
            router.back()
          }}
      >
        <ReactSVG src="/Assets/Icons/arrow_round.svg" className="btn-round__arr"/>
      </button>
  );
};

export default Back;
