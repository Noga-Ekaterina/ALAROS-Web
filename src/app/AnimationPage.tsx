'use client'
import React from 'react';
import { motion } from "framer-motion"
import {IWithChildren} from "@/types/tehnic";
import {usePathname} from "next/navigation";

const AnimationPage = ({children}:IWithChildren) => {
  const pathname = usePathname()

  return (
      <motion.div
          key={pathname}
          initial={{ opacity: 0,  }}
          animate={{ opacity: 1,  }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
  )
};

export default AnimationPage;
