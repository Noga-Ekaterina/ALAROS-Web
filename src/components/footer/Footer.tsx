import React from 'react';
import "./footer.scss"
import {IFooter} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import HtmlProcessing from "@/components/HtmlProcessing";
import cn from "classnames";
import {fetchSingle} from "@/utils/strapFetch";

const init= unstable_cache(async ()=>{
  const data=await fetchSingle<IFooter>('footer')

  if (typeof data==="string" || !data){
    return data
  }

  return data
}, ["footer"], {tags: ["footer"]})

const Footer = async () => {
  const data= await init()

  if (typeof data==="string" || !data) {
    revalidateTag("footer")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__item footer__item--1 footer__item--mobile-visible footer__item--mobile-visible-2 footer__navigation">
            <HtmlProcessing html={data.navigationColumn}/>
          </div>
          {data.columns.map(({text}, index) => (
              <div
                  key={index}
                  className={cn(
                      "footer__item",
                      `footer__item--${index+2}`,
                      data.mobileColumn===(index + 1)
                          && `footer__item--mobile-visible footer__item--mobile-visible-1`
                  )}
              >
                <HtmlProcessing html={text}/>
                {index + 1 === data.socialsColumn && (
                    <div className='footer__socials'>
                      <HtmlProcessing html={data.socials}/>
                    </div>
                )}
              </div>
          ))}
        </div>
      </footer>
  );
};

export default Footer;
