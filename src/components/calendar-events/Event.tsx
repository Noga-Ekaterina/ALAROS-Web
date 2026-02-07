'use client'
import React, { useRef, useEffect, useState } from 'react';
import { IEvent } from "@/types/data";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import {formaterDate} from "@/utils/date";
import Image from "@/components/Image";

interface Props {
  event: IEvent;
}

const Event = ({ event }: Props) => {
  const descRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const lineHeight=1.2;
  const [lastLineWidth, setLastLineWidth] = useState(0);
  const dateStart=formaterDate(event.start)
  const dateEnd=formaterDate(event.end)

  useEffect(() => {
    if (!descRef.current || !textRef.current) return;

    // Проверяем обрезку и измеряем последнюю строку
    const checkTruncation = () => {
      if (descRef.current && textRef.current) {
        const isOverflowing = descRef.current.scrollHeight > descRef.current.clientHeight;
        setIsTruncated(isOverflowing);

        // Измеряем ширину последней строки
        if (isOverflowing) {
          const range = document.createRange();
          range.selectNodeContents(textRef.current);
          const rects = range.getClientRects();
          const lastLineRect = rects[4];

          if (lastLineRect) {
            setLastLineWidth(lastLineRect.width);
          }
        }
      }
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(descRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [event.description]);

  return (
      <div className="calendar-events__event-content">
        <div className="calendar-events__block-text">
          <div className="calendar-events__titles">
            <h3 className="calendar-events__date">
              {dateStart}
              {( dateEnd != dateStart) && <span className="calendar-events__date-end"> - {dateEnd}</span>}
            </h3>
            <div className="calendar-events__name-and-plase">
              <div className="calendar-events__name">
                {nonBreakingSpaces(event.title)}
              </div>
              <p className="calendar-events__plase">{nonBreakingSpaces(event.place)}</p>
            </div>
          </div>
          <div
              ref={descRef}
              className={`calendar-events__description ${isTruncated ? 'truncated' : ''}`}
              style={{
                '--line-height': `${lineHeight}em`,
                '--last-line-width': `${lastLineWidth}px`,
                '--bg-color': '#fff' // Используйте ваш цвет фона
              } as React.CSSProperties}
          >
            <div ref={textRef}>
              <p>
                {nonBreakingSpaces(event.description)}
              </p>
            </div>
          </div>
        </div>
        <Image image={event.image} size='small'/>
      </div>
  );
};

export default Event;