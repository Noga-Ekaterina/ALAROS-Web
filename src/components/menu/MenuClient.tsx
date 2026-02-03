'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {IHtmlString, IMenu, IMenuSection} from "@/types/data";
import {observer} from "mobx-react-lite";
import store from "@/store/store";
import {motion, AnimatePresence} from "framer-motion"; // Добавлено AnimatePresence
import Header from "@/components/header/Header";
import HtmlProcessing from "@/components/HtmlProcessing";
import {usePathname} from "next/navigation";
import cn from "classnames";
import {useHash} from "@/hoocs/useHash";

interface Props{
  data: IMenu
}

const MenuClient = ({data}:Props) => {
  const isActiveLink=(link: string, section?: string)=>{
    if (pathname==="/")
      return false

    const regex = /href=["'](.*?)["']/gs;
    const [href]=Array.from(link.matchAll(regex)).map(m => m[1])
    const [sectionHref]=section? Array.from(section.matchAll(regex)).map(m => m[1]):[]

    return href.startsWith(sectionHref??pathname)
  }

  const {isMenuOpened, togleMenu} = store;
  const isMenuOpenedRef= useRef(isMenuOpened)
  const pathname= usePathname()
  const hash= useHash()
  const [activeSection, setActiveSection] = useState<null | IMenuSection>(null)
  const [indexActiveSection, setIndexActiveSection] = useState<null | number>(null)
  const [isMultiPage, setIsMultiPage] = useState(false)
  const isActiveAddition=data.additionals.find(({text})=> isActiveLink(text))

  useEffect(() => {
    setIsMultiPage(false)
    if (pathname==="/" || isActiveAddition) {
      setActiveSection(null)
      setIndexActiveSection(null)
      return
    }

    for (let key in data.sections) {
      const section=data.sections[key]
      let isNewActiveSection=false

      for (let subsection of section.subsections) {

        if (isActiveLink(subsection.text)){
          isNewActiveSection=true
          break
        }
      }

      if (isNewActiveSection){
        setIndexActiveSection(Number(key))
        setActiveSection(section)

        for (let subsection of section.subsections) {

          if (!isActiveLink(subsection.text, section.section)){
            setIsMultiPage(true)
            break
          }
        }
        break
      }
    }
  }, [pathname, isMenuOpened]);

  useEffect(() => {
    isMenuOpenedRef.current=isMenuOpened
  }, [isMenuOpened]);

  const handleEsc = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      if (isMenuOpenedRef.current)
        document.removeEventListener('keyup', handleEsc);
        togleMenu()
    }
  }, [])

  useEffect(() => {
    if (isMenuOpened)
      document.addEventListener('keyup', handleEsc);

    return () => {
      document.removeEventListener('keyup', handleEsc);
    }
  }, [isMenuOpened]);

  return (
      <AnimatePresence> {/* Обёртка для анимаций */}
        {isMenuOpened && (
            <motion.div
                initial={{y: "-100vh", pointerEvents: "none"}}
                animate={{y: 0, pointerEvents: "auto"}}
                exit={{y: "-100vh", pointerEvents: "none"}}
                transition={{duration: 0.5, ease: 'easeInOut'}}
                className="menu"
            >
              <Header isMenuOpened={true}/>

              <div className="container menu__content">
                <div className="menu__column">
                  {
                    data.sections.map((section, index)=>(
                        <div
                            key={index}
                            className={cn("menu__section-link", {"yellow": index===indexActiveSection})}
                            onMouseOver={()=> {
                              setIndexActiveSection(index)
                              setActiveSection(section)
                            }}
                            onClick={togleMenu}
                        >
                          <HtmlProcessing html={section.section}/>
                        </div>
                    ))
                  }
                </div>

                <div className="menu__column menu__mini-links">
                  {
                      activeSection && activeSection.subsections.length > 0 && <motion.div
                          key={JSON.stringify(activeSection)}
                          initial={{opacity: 0,}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                          transition={{duration: 0.5}} className="menu__column">
                        {
                          activeSection.subsections.map((subsection, index) => (
                              <div
                                  key={index}
                                  className={cn("menu__subsection-link", {"yellow": isMultiPage && isActiveLink(subsection.text)})}
                                  onClick={togleMenu}
                              >
                                <HtmlProcessing html={subsection.text}/>
                              </div>
                          ))
                        }
                      </motion.div>
                  }

                  {
                      (activeSection || isActiveAddition) &&
                      <motion.div
                          initial={{opacity: 0,}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                          transition={{duration: 0.5}} className="menu__column">
                        {
                          data.additionals.map(({text}, index) => (
                              <div
                                  key={index}
                                  className={cn("menu__subsection-link", {"yellow": isActiveLink(text)})}
                                  onClick={togleMenu}
                              >
                                <HtmlProcessing html={text}/>
                              </div>
                          ))
                        }
                      </motion.div>
                  }
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};

export default observer(MenuClient);