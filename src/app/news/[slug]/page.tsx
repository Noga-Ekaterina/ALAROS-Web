import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import {pagesData} from "@/pagesData";
import {fetchData} from "@/utils/fetchData";
import HtmlProcessing from "@/components/HtmlProcessing";
import NewsArticle from "@/app/news/[slug]/NewsArticle";

interface Props{
  params: {
    slug: string
  }
}

interface IData{
  news: null| INewsItem
  newsPages: INews[]
}

const init= async (slug: string)=>{

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
}

const Page = async ({params}:Props) => {
  const slug= params.slug
  const data= await init(slug)

  console.log(pagesData)

  if (!data ||!data.news) return <div></div>


  return (
      <NewsArticle news={data.news} slug={slug} allNews={data.allNews.html}/>
  );
};

export default Page