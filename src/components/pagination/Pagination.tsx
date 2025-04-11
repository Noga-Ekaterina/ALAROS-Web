'use client'
import React, {useEffect} from 'react';
import './pagination.scss'
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";
import cn from "classnames";
import {useSearchParams} from "next/navigation";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import store from "@/store/store";

interface Props{
  count: number
  size: number
}

const Pagination = ({count, size}:Props) => {
  const pages= Math.ceil(count/size)
  const searchParams= useSearchParams()
  const page= Number(searchParams.get("page"))??1
  const {setParam}=useSearchParamsControl()
  const {togleLoading}=store

  const handleClick=(page: string)=> {
    togleLoading(true)
    setParam("page", page)
  }

  useEffect(() => {
    togleLoading(false)
  }, [page]);

  return (
      <div className="pagination">
        <button
            className="pagination__arrow"
            disabled={page <=1}
            onClick={() => handleClick(String(page - 1))}
        >
          <ReactSVG src="/Assets/Icons/arrow.svg"/>
        </button>
        {
          (pages>0 && page < 5) ?
              Array.from({length: pages <= 3 ? pages : pages === 4 ? 4 : 3}, (_, index) => (
                  <button
                      key={index}
                      className={cn("pagination__page",{"pagination__page--active": index + 1 == (page > 0 ? page : 1)})}
                      onClick={() => handleClick(String(index + 1))}>
                    0{index + 1}
                  </button>
              ))
              :
              <button
                  className={cn("pagination__page",{"pagination__page--active": page == 1})}
                  onClick={() => handleClick('1')}>
                01
              </button>
        }
        {
            (pages > 4 ) &&
            <>
              {
                (page > 3 && page < pages-3) ?
                    <>
                      {
                          page > 4 && <span>...</span>
                      }

                      <span className="pagination__page pagination__page--active">{`${page < 10 ? "0" : ''}${page}`}</span>

                      {
                          page < pages - 1 && <span>...</span>
                      }
                    </>
                    : <span>...</span>
              }
              {
                (page>=pages-3) ?
                    Array.from({length: page== pages-3? 4:3}, (_, index) => {
                      const el= pages - (page== pages-3? 3:2)+index
                      return (
                          <button
                              key={index}
                              className={cn("pagination__page", {"pagination__page--active": el == (page > 0 ? page : 1)})}
                              onClick={() => handleClick(String(el))}
                          >
                            {`${el < 10 ? "0" : ''}${el}`}
                          </button>
                      )
                    })
                    :
                    <button
                        className={cn("pagination__page", {"pagination__page--active": pages == (page > 0 ? page : 1)})}
                        onClick={() => handleClick(String(pages))}>
                      {`${pages < 10 ? "0" : ''}${pages}`}
                    </button>
              }
            </>
        }
        <button
            className="pagination__arrow pagination__arrow--next"
            disabled={page >= pages || pages<2}
            onClick={() => handleClick(String(page + 1))}
        >
          <ReactSVG src="/Assets/Icons/arrow.svg"/>
        </button>
      </div>
  );
};

export default Pagination;