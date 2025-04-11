'use client';
import "./loader.scss"
import {AnimatePresence, motion} from 'framer-motion'
import {observer} from "mobx-react-lite"
import store from "@/store/store";

interface Props{
  isClient?: boolean
}

function Loader({isClient}: Props) {
  const {isLoading}=store
  return (
      <AnimatePresence mode="wait">
        {
          (!isClient || isLoading) &&
            <motion.div
                className="loader"
                initial={{opacity: 0,}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
               <p>Загрузка...</p>
            </motion.div>
        }
      </AnimatePresence>
  );
}

export default observer(Loader)