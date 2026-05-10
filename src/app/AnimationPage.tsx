'use client'
import React, {useEffect, useRef} from 'react';
import { AnimatePresence, motion } from "framer-motion"
import {IWithChildren, IWithClass} from "@/types/tehnic";
import {useGetHashPosition} from "@/hoocs/useGetHashPosition";
import {smoothScroll} from "@/utils/smoothScroll";
import store from "@/store/store";
import {usePathname} from "next/navigation";
import {observer} from "mobx-react-lite";

interface Props extends IWithChildren, IWithClass{
  conditions?: boolean
  isNoWait?: boolean
  onClick?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>)=> void
  isModal?: boolean
}

const AnimationPage = ({ children, conditions, className, isNoWait, onClick, isModal }: Props) => {
  const getHashPosition= useGetHashPosition()
  const {isBack, isLoaderClosing, setIsBack}=store
  const pathname = usePathname()
  const isFirstRender = useRef(true)
  const prevPathname = useRef(pathname)


  useEffect(() => {
    if (isModal) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      prevPathname.current = pathname
      return
    }

    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname

    if (isBack){
      setIsBack(false)
      return;
    }

    const timer = setTimeout(()=>smoothScroll(getHashPosition(window.location.hash)), 500)

    return () => clearTimeout(timer)
  }, [pathname]);

  const content = (conditions== undefined || conditions) && (
      <motion.div
          key={isModal ? JSON.stringify(conditions) : pathname}
          initial={!isModal && isFirstRender.current ? false : {opacity: 0, pointerEvents: "none"}}
          animate={{opacity: 1, pointerEvents: "auto"}}
          exit={{opacity: 0, pointerEvents: "none"}}
          transition={{duration: 0.5, ease: 'easeInOut', delay: !isModal && isLoaderClosing ? 0.5  : 0}}
          className={className}
          style={{msOverflowX: 'hidden', msOverflowY: "hidden", overflow: "clip"}}
          onClick={onClick}
      >
        {children}
      </motion.div>
  );

  if (!isModal) {
    return content;
  }

  return (
      <AnimatePresence mode={isNoWait ? 'sync' : 'wait'}>
        {content}
      </AnimatePresence>
  )
};

export default observer(AnimationPage);
