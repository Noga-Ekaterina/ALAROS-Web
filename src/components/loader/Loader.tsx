'use client';
import "./loader.scss"
import {AnimatePresence, motion} from 'framer-motion'
import {observer} from "mobx-react-lite"
import store from "@/store/store";
import logo from "../../../public/animations/logo.json"
import dynamic from 'next/dynamic';
import {useEffect} from "react";

// Динамически загружаем Lottie только на клиенте
const Lottie = dynamic(
    () => import("lottie-react"),
    { ssr: false }
);

interface Props{
  isClient?: boolean
}

function Loader({isClient}: Props) {
  const {isLoading, noIsFirstOpen, chekedIsFirstOpen} = store;

  useEffect(() => {
    return ()=>{
      if (!noIsFirstOpen)
        chekedIsFirstOpen()
    }
  }, []);

  return (
      <AnimatePresence mode="wait">
        {(!isClient || isLoading) && (
            <motion.div
                className="loader"
                initial={{opacity: noIsFirstOpen? 0:1}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
              <Lottie
                  animationData={logo}
                  loop={true}
                  className="loader__icon"
              />
            </motion.div>
        )}
      </AnimatePresence>
  );
}

export default observer(Loader);