import React, {FC, JSX, useEffect, useState} from "react";
import parse from "html-react-parser";
import {Link} from "react-router-dom";
import {useGetHashPosition} from "../hoocs/useGetHashPosition";
import {smoothScroll} from "../utils/smoothScroll";

interface Props{
  html: string
}

const HtmlProcessing = ({html}:Props) => {
  const [elements, setElements] = useState<JSX.Element[]>([])
  const getHashPosition= useGetHashPosition()

  const handleHashed=(event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    event.preventDefault()

    const targetElement = event.target as HTMLElement;

    const hash = targetElement.getAttribute("href")
        ?? targetElement.closest("a")?.getAttribute("href");


    console.log(event)

    if (!hash) return

    smoothScroll(getHashPosition(hash))

    setTimeout(()=> window.location.hash=hash.slice(1))
  }

  const replaceWithLink = (element: JSX.Element):  JSX.Element => {
    const props=element.props
    if (element.type === 'a') {
      if (props.className?.includes('download'))
        return React.createElement("a", {...props, className: props.className.replace("download",''), download: true }, props.children);
      else if (props.href.startsWith('/') && !props.download)
        return React.createElement(Link, { to: props.href, ...props }, props.children);
      else if (props.href.startsWith('#') && !props.download)
        return React.createElement("a", { to: props.href, onClick: handleHashed, ...props }, props.children);
      else if (props.href=='text')
        return React.createElement("span", {className: props.className}, props.children);
    }
    if (props && props.children) {
      const newChildren = Array.isArray(props.children)
          ? props.children.map((child: JSX.Element) => replaceWithLink(child))
          : replaceWithLink(props.children);
      return React.createElement(element.type, { ...props }, newChildren);
    }
    return element;
  };

  useEffect(() => {
    let result: JSX.Element[]=[]

    // Убираем пустые теги <p></p>
    let str = html.replace("<p></p>", '');

    // Регулярное выражение для замены ссылки с классом "red" и href "text"
    // const patternRedLink = /<a[^>]*class="[^"]*red[^"]*"[^>]*href="text"[^>]*>.*?<\/a>/gs;
    //
    // // Заменяем ссылки на <span>
    // str = str.replace(patternRedLink, (match) => {
    //   console.log("text")
    //   return match.replace(/<a.*class="([^"]*)".*href="text".*>(.*?)<\/a>/, '<span class="$1">$2</span>');
    // });
    //
    // // Регулярное выражение для замены ссылки с классом "download"
    // const patternDownloadLink = /<a[^>]*class="[^"]*?download[^"]*?"[^>]*?href="[^>]*">.*?<\/a>/gs;
    // console.log(patternDownloadLink.test(html))
    //
    // // Заменяем на нужный формат
    // str = str.replace(patternDownloadLink, (match) => {
    //   console.log("download")
    //   return match.replace(/<a(.*?)class="download(.*?)"(.*)>(.*?)<\/a>/, '<a$1 download class="$2"$3>$4</a>');
    // });
    //
    // // Регулярное выражение для обработки ссылок
    // const linksPattern = /<a[^>]*class="([^"']*)"[^>]*href="(\/[^"]*)"[^>]*>(.*?)<\/a>/g;

    const jsx = parse(str)

    if (typeof jsx=="object"){
      if (Array.isArray(jsx))
        setElements(jsx.map(el=> replaceWithLink(el)))
      else
        setElements([replaceWithLink(jsx)])
    }
  }, [html]);

  return (
      <>
        {
          elements.map(el=>el)
        }
      </>
  );
}

export default HtmlProcessing