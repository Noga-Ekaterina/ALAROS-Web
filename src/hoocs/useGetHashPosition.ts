import {useGetRem} from "./useGetRem";

export const useGetHashPosition=()=>{
  const rem= useGetRem()

  return (hash: string)=>{
    const el= document.getElementById(hash.slice(1))
    if (!el) return window.scrollY

    const {top} = el.getBoundingClientRect()

    return top - 60 * rem
  }
}

