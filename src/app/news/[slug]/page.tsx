import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import {fetchData, getNewsPageData} from "@/utils/fetchData";
import HtmlProcessing from "@/components/HtmlProcessing";
import NewsArticle from "@/app/news/[slug]/NewsArticle";
import {unstable_cache} from "next/cache";

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

      const data: IData= await fetchData( `
                query NewsItemQuery {
                  news(where: {slug: "${slug}"}) {
                    date
                    description
                    title
                    slug
                    place
                    body {
                      html
                    }
                  }
                }`)

      return data.news
    }, ["news-article"], {tags: [`news-${slug}`]})
)

const Page = async ({params}:Props) => {
  const slug= params.slug
  const getData= init(slug)
  const news= await getData(slug)
  const pageData= await getNewsPageData()

  if (!pageData||!news) return <div></div>


  return (
      <NewsArticle news={news} slug={slug} allNews={pageData.allNews.html}/>
  );
};

export default Page