import {Dispatch, MutableRefObject, SetStateAction, useEffect} from "react";

interface Params {
  ref: MutableRefObject<HTMLElement | null>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  vw?: number
}
export const useClose = (params: Params) => {
  const {ref, isOpen, setIsOpen}=params
  const size= params.vw ?? 0

   const handleOutsideClick = (e: Event) => {
      if (ref.current){
        if (ref.current && !ref.current.contains(e.target as Node) && window.innerWidth > size) {
          setIsOpen(false);
          console.log(e.target)
        }
      }
   };

   useEffect(() => {
      if (isOpen) {
         document.addEventListener('click', handleOutsideClick);
      } else {
         document.removeEventListener('click', handleOutsideClick);
      }

      return () => {
         document.removeEventListener('click', handleOutsideClick);
      }
   }, [isOpen])

}