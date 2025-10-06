import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import {fetchData, getNewsPageData} from "@/utils/fetchData";
import HtmlProcessing from "@/components/HtmlProcessing";
import NewsArticle from "@/app/news/[slug]/NewsArticle";
import {revalidateTag, unstable_cache} from "next/cache";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";

interface Props{
  params: {
    slug: string
  }
}

interface IData{
  news: null| INewsItem
}

const init=  (slug: string)=>(
    unstable_cache(async (slug: string)=>{

      const data= await fetchData<IData>( `
                query NewsItemQuery {
                  news(where: {slug: "${slug}"}) {
                    date
                    description
                    title
                    cover
                    slug
                    place
                    body {
                      html
                    }
                  }
                }`)


      if (typeof data==="string" || !data){
        return data
      }

      return data.news??undefined
    }, ["news-article"], {tags: [`news-${slug}`]})
)

const Page = async ({params}:Props) => {
  const slug= params.slug

  if (slug.length>=256){
    return (
        <AnimationPage>
          <NotFoundSample title={`Тут ничего \nне нашлось`} mainText={"404"} mainTextMobile={`40\n04`}/>
        </AnimationPage>
    )
  }

  const getData= init(slug)
  const news= await getData(slug)
  const pageData= await getNewsPageData()

  if (typeof news=="string" || news===null) {
    revalidateTag(`news-${slug}`)
    return <div>произошла ошибка{news && `: ${news}`}, перезагрузите страницу</div>
  }

  if (!pageData|| typeof pageData==="string" ) {
    revalidateTag("NewsPage")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  if (news === undefined){
    return (
        <AnimationPage>
          <NotFoundSample title={`Тут ничего \nне нашлось`} mainText={"404"} mainTextMobile={`40\n04`}/>
        </AnimationPage>
    )
  }

  return (
      <AnimationPage>
        <NewsArticle news={news} slug={slug} allNews={pageData.allNews.html}/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Новости",
};

export default Page