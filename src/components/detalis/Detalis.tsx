'use client'
import React, {JSX, useEffect, useLayoutEffect, useRef, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import "./detalis.scss"
import { IWithChildren } from "../../types/tehnic";
import cn from "classnames";
import { useGetRem } from "../../hoocs/useGetRem";
import {useHash} from "@/hoocs/useHash";
import {useLenis} from "@studio-freight/react-lenis";
import HtmlProcessing from "@/components/HtmlProcessing";
import {useMediaQuery} from "react-responsive";
import DetalisClue from "@/components/detalis/DetalisClue";

interface IProps extends IWithChildren {
  title: JSX.Element
  rightElement?: JSX.Element|string
  hash?: string
  startIsOpen?: boolean
  isBigGray?: boolean
  isBtnBg?: boolean
  disabled?: boolean
  isSticky?: boolean
  showClue?: boolean
}

const Detalis = ({ title, rightElement, hash, startIsOpen, isBigGray, isBtnBg, disabled, isSticky, showClue, children }: IProps) => {
  const activeHash= useHash()
  const [isOpen, setIsOpen] = useState(startIsOpen??false);
  const [isContentHidden, setIsContentHidden] = useState(!(startIsOpen??false));
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  const [isInit, setIsInit] = useState(false)
  const contentRef = useRef<HTMLFieldSetElement>(null);
  const rem = useGetRem();
  const lenis = useLenis()

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const openDetails = () => {
    if (isOpen)
      return;

    setIsContentHidden(false);
    setIsPendingOpen(true);
  };

  const handleClick = () => {
    if (!isOpen) {
      openDetails();
      return;
    }

    setIsOpen(false);
  };

  // Обработчики с правильными сигнатурами
  const handleEnter = (node: HTMLElement) => {
    node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
    node.parentElement?.style.setProperty('overflow', "hidden");
  };

  const handleEntering = (node: HTMLElement) => {
    node.style.marginTop = '0';
    node.style.transition = 'margin-top 500ms ease-in-out';
  };

  const handleEntered = (node: HTMLElement) => {
    node.parentElement?.style.setProperty('overflow', 'visible');
  };

  const handleExit = (node: HTMLElement) => {
    node.parentElement?.style.setProperty('overflow', "hidden");
    node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
  };

  const handleExiting = (node: HTMLElement) => {
    node.style.transition = 'margin-top 500ms ease-in-out'
  };

  const handleExited = () => {
    setIsContentHidden(true);
  };

  useLayoutEffect(() => {
    const currentHash = window.location.hash.slice(1);

    if (hash && (hash === activeHash || hash === currentHash)) {
      openDetails();
    }

    setIsInit(true)
  }, [activeHash, hash]);

  // Инициализация начального состояния
  useLayoutEffect(() => {
    if (contentRef.current){
      const node = contentRef.current;

      if (!isOpen) {
        node.style.transition = isInit ? 'margin-top 500ms ease-in-out' : 'none';
        node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
        node.parentElement?.style.setProperty('overflow', "hidden");
      }
    }
  }, [isOpen, isInit, rem]);

  useLayoutEffect(() => {
    if (!isPendingOpen || isContentHidden || !contentRef.current)
      return;

    const node = contentRef.current;
    node.style.transition = 'none';
    node.style.marginTop = `-${node.getBoundingClientRect().height}px`;
    node.parentElement?.style.setProperty('overflow', "hidden");

    const animationFrame = requestAnimationFrame(() => {
      setIsOpen(true);
      setIsPendingOpen(false);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isPendingOpen, isContentHidden, rem]);

  useEffect(() => {
    setTimeout(()=>lenis?.resize(), 1000)
  }, [isOpen]);

  const defaultTrigger = showClue ? <DetalisClue disabled={disabled} isOpen={isOpen} /> : <span className="detalis__icon">+</span>
  const contentWrapperStyle: React.CSSProperties | undefined = isContentHidden
    ? { height: 0, overflow: "hidden" }
    : undefined;

  return (
      <div
          className={cn("detalis", { "detalis--opened": isOpen })}
          style={{pointerEvents: disabled? "none":"auto"}}
      >
        <button
            className={cn("detalis__btn", {"detalis__btn--sticky": isOpen &&isSticky, "detalis__btn--big-gray": isBigGray, "detalis__btn--btn-bg": isBtnBg})}
            onClick={handleClick}
            disabled={disabled}
        >
          {title}
          {
            isBtnBg ?
              <div className="detalis__right-element">
                {isClient && mobileScreen ?
                    showClue ? <DetalisClue disabled={disabled} isOpen={isOpen} /> : <><span>[</span><span className='detalis__icon'>+</span><span>]</span></>
                  :
                  typeof rightElement === "string" ? <HtmlProcessing html={rightElement} /> : rightElement || defaultTrigger
                }
              </div>
            :
              rightElement || defaultTrigger
          }
        </button>

        <div style={contentWrapperStyle}>
          <CSSTransition
              in={isOpen}
              timeout={500}
              nodeRef={contentRef}
              onEnter={() => contentRef.current && handleEnter(contentRef.current)}
              onEntering={() => contentRef.current && handleEntering(contentRef.current)}
              onEntered={() => contentRef.current && handleEntered(contentRef.current)}
              onExit={() => contentRef.current && handleExit(contentRef.current)}
              onExiting={() => contentRef.current && handleExiting(contentRef.current)}
              onExited={handleExited}
          >
            <fieldset disabled={!isOpen} className="detalis__content" ref={contentRef}>
              {children}
            </fieldset>
          </CSSTransition>
        </div>
      </div>
  );
};

export default Detalis;
