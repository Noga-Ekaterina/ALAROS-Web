'use client'
import React from 'react';
import { AnimatePresence, motion } from "framer-motion"
import {IWithChildren, IWithClass} from "@/types/tehnic";

interface Props extends IWithChildren, IWithClass{
  conditions?: boolean
  isNoWait?: boolean
  onClick?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>)=> void
}

const AnimationPage = ({ children, conditions, className, isNoWait, onClick }: Props) => {

  return (
      <AnimatePresence mode={isNoWait ? 'sync' : 'wait'}>
        {
          (conditions== undefined || conditions)&& (
                <motion.div
                    key={JSON.stringify(conditions)}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
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