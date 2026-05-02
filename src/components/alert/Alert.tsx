'use client'
import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import "./alert.scss"
import {motion} from "framer-motion";

interface Props{
  message: string
}

const Alert = ({message}:Props) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  if (!portalContainer) {
    return null;
  }

  return createPortal(
      <motion.div
          initial={{opacity: 0,}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          className="alert"
      >
        {message}
      </motion.div>,
      portalContainer
  );
};

export default Alert;
