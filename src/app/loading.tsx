'use client'
import {AnimatePresence, motion} from 'framer-motion'

const Loading = () => {
  return (
      <AnimatePresence mode="wait">
        <motion.div
            className="loading"
            initial={{opacity: 1, }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
        >
          <p>Загрузка...</p>
        </motion.div>
      </AnimatePresence>
  );
};

export default Loading;