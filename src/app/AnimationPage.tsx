'use client'
import React, {useEffect, useRef} from 'react';
import { AnimatePresence, motion } from "framer-motion"
import {IWithChildren, IWithClass} from "@/types/tehnic";
import {useGetHashPosition} from "@/hoocs/useGetHashPosition";
import {smoothScroll} from "@/utils/smoothScroll";
import store from "@/store/store";
import {usePathname} from "next/navigation";

interface Props extends IWithChildren, IWithClass{
  conditions?: boolean
  isNoWait?: boolean
  onClick?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>)=> void
  isModal?: boolean
}

const AnimationPage = ({ children, conditions, className, isNoWait, onClick, isModal }: Props) => {
  const getHashPosition= useGetHashPosition()
  const {isBack, setIsBack}=store
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isModal) return

    if (isBack){
      setIsBack(false)
      return;
    }

    window.scrollTo(0,0)
    const timer = setTimeout(()=>smoothScroll(getHashPosition(window.location.hash)), 500)

    return () => clearTimeout(timer)
  }, [pathname]);

  useEffect(() => {
    isFirstRender.current = false
  }, []);

  return (
      <AnimatePresence mode={isNoWait ? 'sync' : 'wait'}>
        {
          (conditions== undefined || conditions)&& (
                <motion.div
                    key={isModal ? JSON.stringify(conditions) : pathname}
                    initial={!isModal && isFirstRender.current ? false : {opacity: 0, pointerEvents: "none"}}
                    animate={{opacity: 1, pointerEvents: "auto"}}
                    exit={{opacity: 0, pointerEvents: "none"}}
                    transition={{duration: 0.5, ease: 'easeInOut'}}
                    className={className}
                    style={{msOverflowX: 'hidden', msOverflowY: "hidden", overflow: "clip"}}
                    onClick={onClick}
                >
                  {children}
                </motion.div>
            )
        }
      </AnimatePresence>
  )
};

export default AnimationPage;
