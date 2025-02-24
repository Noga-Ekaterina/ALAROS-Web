import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import {fetchData} from "@/utils/fetchData";
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
  newsPages: INews[]
}

const init= unstable_cache(async (slug: string)=>{

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
                  newsPages {
                    allNews {
                      html
                    }
                  }
                }`)
  return {news: data.news, allNews: data.newsPages[0].allNews}
}, ["news-article"], {tags: ["News"]})

const Page = async ({params}:Props) => {
  const slug= params.slug
  const data= await init(slug)


  if (!data ||!data.news) return <div></div>


  return (
      <NewsArticle news={data.news} slug={slug} allNews={data.allNews.html}/>
  );
};

export default Page