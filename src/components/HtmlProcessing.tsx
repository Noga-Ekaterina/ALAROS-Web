'use client'
import React, {FC, JSX, useCallback, useEffect, useState} from "react";
import parse from "html-react-parser";
import Link from 'next/link';
import {useGetHashPosition} from "../hoocs/useGetHashPosition";
import {smoothScroll} from "../utils/smoothScroll";
import {useGetRem} from "@/hoocs/useGetRem";

interface Props{
  html: string| JSX.Element[]
}

const HtmlProcessing = ({html}:Props) => {
  const rem= useGetRem()
  const getHashPosition= useGetHashPosition()

  const handleHashed=useCallback((event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    event.preventDefault()

    const targetElement = event.target as HTMLElement;

    const hash = targetElement.getAttribute("href")
        ?? targetElement.closest("a")?.getAttribute("href");

    if (!hash) return

    smoothScroll(getHashPosition(hash))

    setTimeout(()=> window.location.hash=hash.slice(1))
  }, [getHashPosition])

  const replaceWithLink = (element: JSX.Element, index: number): JSX.Element => {
    const uniqueId = element.props?.id || element.key ||element.props?.className || element.props?.href || `key-${index}`; // Используем id или href, если доступны
    const key = `${uniqueId}-${element.type}-${index}`; // Уникальный ключ на основе id/href и типа элемента
    const props = {...element.props, key};

    if (element.type === 'a') {
      if (props.className?.includes('download'))
        return React.createElement("a", {...props, className: props.className.replace("download", ''), download: true}, props.children);
      else if (props.href.startsWith('/') && !props.download)
        return React.createElement(Link, { href: props.href, ...props }, props.children);
      else if (props.href.startsWith('#') && !props.download)
        return React.createElement("a", { to: props.href, onClick: handleHashed, ...props }, props.children);
      else if (props.href === 'text')
        return React.createElement("span", { className: props.className, key }, props.children);
    }

    if (props && props.children) {
      const newChildren = Array.isArray(props.children)
          ? props.children.map((child: JSX.Element, childIndex: number) => replaceWithLink(child, childIndex))
          : replaceWithLink(props.children, 0); // Используем 0 для единственного дочернего элемента
      return React.createElement(element.type, { ...props }, newChildren);
    }
    return element;
  };


  const parseHtml=()=>{

    // Убираем пустые теги <p></p>
    let str = typeof html ==="string"&&
        html.replace("<p></p>", '')
            .replaceAll("^", "&nbsp;");

    const jsx = str? parse(str):html

    if (typeof jsx=="object"){
      if (Array.isArray(jsx))
        return (jsx.map(el=> replaceWithLink(el, 0)))
      else
        return([replaceWithLink(jsx, 0)])
    }
  }
  const [elements, setElements] = useState<JSX.Element[] |undefined>(parseHtml())

  useEffect(() => {
    setElements(parseHtml())
  }, [html]);

  return (
      <>
        {
          elements?.map((el, index)=>{
            return React.createElement(el.type, {...el.props, key:index+ Date.now()}, el.props.children)
          })
        }
      </>
  );
}

export default HtmlProcessing
