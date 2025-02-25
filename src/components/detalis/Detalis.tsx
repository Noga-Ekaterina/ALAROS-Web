'use client'
import React, {JSX, useLayoutEffect, useRef, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import "./detalis.scss"
import { IWithChildren } from "../../types/tehnic";
import cn from "classnames";
import { useGetRem } from "../../hoocs/useGetRem";

interface IProps extends IWithChildren {
  title: JSX.Element
  rightElement?: JSX.Element
}

const Detalis = ({ title, rightElement, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const rem = useGetRem();

  const handleClick = () => setIsOpen(!isOpen);

  // Обработчики с правильными сигнатурами
  const handleEnter = (node: HTMLElement) => {
    node.style.marginTop = `-${node.scrollHeight + 3 * rem}px`;
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
    node.style.marginTop = `-${node.scrollHeight + 3 * rem}px`;
  };

  const handleExiting = (node: HTMLElement) => {
    node.style.transition = 'margin-top 500ms ease-in-out'
  };

  // Инициализация начального состояния
  useLayoutEffect(() => {
    if (contentRef.current && !isOpen) {
      const node = contentRef.current;
      node.style.marginTop = `-${node.scrollHeight + 3 * rem}px`;
      node.style.overflow = 'hidden';
    }
  }, [isOpen, rem]);

  return (
      <div className={cn("detalis", { "detalis--opened": isOpen })}>
        <button className="detalis__btn" onClick={handleClick}>
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