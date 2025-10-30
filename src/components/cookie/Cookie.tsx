'use client'
import React, {useEffect, useState} from 'react';
import "./cookie.scss"
import {motion} from "framer-motion";
import store from "@/store/store";

const Cookie = () => {
  const [isShow, setIsShow] = useState(true)
  const {setIsCookie}=store

  useEffect(() => {
    const agreementCookieLocal= localStorage?.getItem("agreementCookie") === "true" || false

    setIsCookie(agreementCookieLocal)
    setIsShow(!agreementCookieLocal)
  }, []);
  if (!isShow) return null

  return (
      <motion.div
          initial={{opacity: 0,}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          className="cookie"
      >
        <div className="cookie__text">
          Сайт использует Cookie <br/>
          для анализа трафика <br/>
          и оптимизации работы сервиса
        </div>

        <div className="cookie__btns">
          <button className="cookie__btn cookie__btn--dark" onClick={()=> {
            setIsShow(false)
            localStorage.setItem("agreementCookie", "true")
          }}>Принять</button>
          <button className="cookie__btn" onClick={()=> setIsShow(false)}>Отклонить</button>
        </div>
      </motion.div>
  );
};

export default Cookie;
