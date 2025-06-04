'use client'
import React, {useEffect, useState} from 'react';
import {IHtmlString, IMenuSection} from "@/types/data";
import {observer} from "mobx-react-lite";
import store from "@/store/store";
import {motion, AnimatePresence} from "framer-motion"; // Добавлено AnimatePresence
import Header from "@/components/header/Header";
import HtmlProcessing from "@/components/HtmlProcessing";
import {usePathname} from "next/navigation";
import cn from "classnames";
import {useHash} from "@/hoocs/useHash";

interface Props{
  data: IMenuSection[]
}

const MenuClient = ({data}:Props) => {
  const {isMenuOpened, togleMenu} = store;
  const additionals= data.filter(section=> section.isAdditional)
  const sections= data.filter(section=> !section.isAdditional)
  const pathname= usePathname()
  const hash= useHash()
  const [activeSection, setActiveSection] = useState<null | IMenuSection>(null)
  const [isMultiPage, setIsMultiPage] = useState(false)

  const isActiveLink=(link: IHtmlString, section?: IHtmlString)=>{
    const regex = /href=["'](.*?)["']/gs;
    const [href]=Array.from(link.html.matchAll(regex).map(m => m[1]))
    const [sectionHref]=section? Array.from(section.html.matchAll(regex).map(m => m[1])):[]

    return href.startsWith(sectionHref??pathname)
  }

  useEffect(() => {
    setIsMultiPage(false)
    if (pathname==="/" || additionals.find(({section})=> isActiveLink(section))) {
      setActiveSection(null)
      return
    }

    for (let section of data) {
      let isNewActiveSection=false

      for (let subsection of section.subsections) {

        if (isActiveLink(subsection)){
          isNewActiveSection=true
          break
        }
      }

      if (isNewActiveSection){
        setActiveSection(section)

        for (let subsection of section.subsections) {

          if (!isActiveLink(subsection, section.section)){
            setIsMultiPage(true)
            break
          }
        }
        break
      }
    }
  }, [pathname, isMenuOpened]);

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
                    sections.map(section=>(
                        <div
                            key={section.position}
                            className={cn("menu__section-link", {"yellow": section.position===activeSection?.position})}
                            onMouseOver={()=> setActiveSection(section)}
                            onClick={togleMenu}
                        >
                          <HtmlProcessing html={section.section.html}/>
                        </div>
                    ))
                  }
                </div>

                <div className="menu__column menu__mini-links">
                  <motion.div
                      key={JSON.stringify(activeSection)}
                      initial={{opacity: 0,}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.5}} className="menu__column">
                    {
                      activeSection?.subsections.map((subsection, index) => (
                          <div
                              key={index}
                              className={cn("menu__subsection-link", {"yellow": isMultiPage&&isActiveLink(subsection)})}
                              onClick={togleMenu}
                          >
                            <HtmlProcessing html={subsection.html}/>
                          </div>
                      ))
                    }
                  </motion.div>
                  {
                    additionals.map(({section}, index) => (
                        <div
                            key={index}
                            className={cn("menu__subsection-link", {"yellow": isActiveLink(section)})}
                            onClick={togleMenu}
                        >
                          <HtmlProcessing html={section.html}/>
                        </div>
                    ))
                  }
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};

export default observer(MenuClient);