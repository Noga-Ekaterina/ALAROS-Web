'use client'
import React, {JSX, useEffect, useLayoutEffect, useRef, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import "./detalis.scss"
import { IWithChildren } from "../../types/tehnic";
import cn from "classnames";
import { useGetRem } from "../../hoocs/useGetRem";
import {useHash} from "@/hoocs/useHash";
import {useLenis} from "@studio-freight/react-lenis";

interface IProps extends IWithChildren {
  title: JSX.Element
  rightElement?: JSX.Element
  hash?: string
  startIsOpen?: boolean
  isBigGray?: boolean
}

const Detalis = ({ title, rightElement, hash, startIsOpen, isBigGray, children }: IProps) => {
  const activeHash= useHash()
  const [isOpen, setIsOpen] = useState(startIsOpen??false);
  const [isInit, setIsInit] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null);
  const rem = useGetRem();
  const lenis = useLenis()

  const handleClick = () => setIsOpen(!isOpen);

  // Обработчики с правильными сигнатурами
  const handleEnter = (node: HTMLElement) => {
    node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
    node.style.overflow = 'hidden';
  };

  const handleEntering = (node: HTMLElement) => {
    node.style.marginTop = '0';
    node.style.transition = 'margin-top 500ms ease-in-out';
  };

  const handleEntered = (node: HTMLElement) => {
    node.style.overflow = 'visible';
  };

  const handleExit = (node: HTMLElement) => {
    node.style.overflow = 'hidden';
    node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
  };

  const handleExiting = (node: HTMLElement) => {
    node.style.transition = 'margin-top 500ms ease-in-out'
  };

  useLayoutEffect(() => {
    if (hash===activeHash)
      setIsOpen(true)

    setIsInit(true)
  }, [activeHash]);

  // Инициализация начального состояния
  useLayoutEffect(() => {
    setTimeout(()=>{
      if (contentRef.current){
        const node = contentRef.current;
        if (!isOpen && (hash!==window.location.hash.slice(1) ||isInit)) {
          node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
          node.style.overflow = 'hidden';
        }else {
          node.style.transition = 'margin-top 500ms ease-in-out'
        }
      }
    }, 100)
  }, [isOpen, rem]);

  useEffect(() => {
    setTimeout(()=>lenis?.resize(), 1000)
  }, [isOpen]);

  return (
      <div className={cn("detalis", { "detalis--opened": isOpen })}>
        <button className={cn("detalis__btn", {"detalis__btn--big-gray": isBigGray})} onClick={handleClick}>
          {title}
          {rightElement || <span className="detalis__icon">+</span>}
        </button>

        <CSSTransition
            in={isOpen}
            timeout={500}
            nodeRef={contentRef}
            onEnter={() => contentRef.current && handleEnter(contentRef.current)}
            onEntering={() => contentRef.current && handleEntering(contentRef.current)}
            onEntered={() => contentRef.current && handleEntered(contentRef.current)}
            onExit={() => contentRef.current && handleExit(contentRef.current)}
            onExiting={() => contentRef.current && handleExiting(contentRef.current)}
        >
          <div className="detalis__content" ref={contentRef}>
            {children}
          </div>
        </CSSTransition>
      </div>
  );
};

export default Detalis;