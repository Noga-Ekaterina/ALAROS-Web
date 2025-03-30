import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import {fetchData, getNewsPageData} from "@/utils/fetchData";
import HtmlProcessing from "@/components/HtmlProcessing";
import NewsArticle from "@/app/news/[slug]/NewsArticle";
import {revalidateTag, unstable_cache} from "next/cache";

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

  if (news === undefined) return <div>новость не найдена</div>

  return (
      <NewsArticle news={news} slug={slug} allNews={pageData.allNews.html}/>
  );
};

export default Page