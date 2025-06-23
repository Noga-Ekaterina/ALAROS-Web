'use client'
import React from 'react';
import "./form-error.scss"
import {motion} from "framer-motion";

const FormError = () => {
  return (
      <motion.div
          initial={{opacity: 0,}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          className="form-error"
      >
        Ошибка отправки формы
      </motion.div>
      );
};

export default FormError;
