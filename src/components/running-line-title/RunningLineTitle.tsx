'use client'

import React, {useEffect, useState} from 'react';
import Marquee from "react-fast-marquee";

interface Props {
  text: string;
  className?: string;
  marqueeClassName?: string;
  speed?: number;
}

const RunningLineTitle = ({text, className, marqueeClassName, speed = 25}: Props) => {
  const [titleNode, setTitleNode] = useState<HTMLDivElement | null>(null);
  const [titleTextNode, setTitleTextNode] = useState<HTMLParagraphElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!titleNode || !titleTextNode) return;

    const checkTruncation = () => {
      setIsPlay(titleTextNode.clientWidth > titleNode.clientWidth);
    };

    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(titleNode);
    observer.observe(titleTextNode);

    return () => observer.disconnect();
  }, [text, titleNode, titleTextNode]);

  useEffect(() => {
    if (!titleNode) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(titleNode);

    return () => observer.disconnect();
  }, [titleNode]);

  return (
      <div className={className} ref={setTitleNode}>
        <Marquee direction="left" play={isPlay && isVisible} speed={speed} className={marqueeClassName} key={String(isPlay)}>
          <p ref={setTitleTextNode}>{text}</p>
        </Marquee>
      </div>
  );
};

export default RunningLineTitle;
