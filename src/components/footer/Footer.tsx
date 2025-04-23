import React from 'react';
import "./footer.scss"
import {IFooter} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import HtmlProcessing from "@/components/HtmlProcessing";
import cn from "classnames";

interface IData{
  footers: IFooter[]
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
    query MyQuery {
      footers {
        navigationColumn {
          html
        }
        columns {
          html
        }
        mobileColumns
        socials {
          html
        }
        socialsColumn
      }
    }
  `)

  if (typeof data==="string" || !data){
    return data
  }

  return data.footers[0]
}, ["footer"], {tags: ["Footer"]})

const Footer = async () => {
  const data= await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Footer")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__item footer__item--1 footer__item--mobile-visible footer__item--mobile-visible-2 footer__navigation">
            <HtmlProcessing html={data.navigationColumn.html}/>
          </div>
          {data.columns.map(({html}, index) => (
              <div
                  key={index}
                  className={cn(
                      "footer__item",
                      `footer__item--${index+2}`,
                      data.mobileColumns.includes(index + 1)
                          && `footer__item--mobile-visible footer__item--mobile-visible-${data.mobileColumns.indexOf(index+1)+1}`
                  )}
              >
                <HtmlProcessing html={html}/>
                {index + 1 === data.socialsColumn && (
                    <div className='footer__socials'>
                      <HtmlProcessing html={data.socials.html}/>
                    </div>
                )}
              </div>
          ))}
        </div>
      </footer>
  );
};

export default Footer;
