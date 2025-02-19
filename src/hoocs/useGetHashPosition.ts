import {useGetRem} from "./useGetRem";
import {useCallback} from "react";

export const useGetHashPosition=()=>{
  const rem= useGetRem()

  return useCallback((hash: string)=>{
    const el= document.getElementById(hash.slice(1))
    if (!el) return window.scrollY

    const {top} = el.getBoundingClientRect()

    console.log(rem)

    return top - 60 * rem
  }, [rem])
}

