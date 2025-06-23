'use client'
import React from 'react';
import "./back.scss"
import {usePathname, useRouter} from "next/navigation";
import {ReactSVG} from "react-svg";

const Back = () => {
  const pathname= usePathname()
  const router= useRouter()

  if (pathname==="/") return null

  return (
      <button
          className="btn-round back"
          onClick={() => router.back()}
      >
        <ReactSVG src="/Assets/Icons/arrow_round.svg" className="btn-round__arr"/>
      </button>
  );
};

export default Back;
