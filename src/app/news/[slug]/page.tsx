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
  newsPages?: INews[]
}

const init= async (slug: string)=>{
  const {newsPages, news}=pagesData
  const keys= Object.keys(newsPages)
  let newsItem: null|INewsItem=null

  console.log(newsPages)

  for (let i=0; i<=keys.length-1; i++){
    const newsSearch= newsPages[keys[i]].find(item=> item.slug==slug)
    if (newsSearch){
      newsItem=newsSearch
      break
    }
  }

  if (!news){
    const data: IData= await fetchData( `
          query NewsItemQuery {
            newsPages {
              allNews {
                html
              }
              title
            }
          }`)

    if (data.newsPages)
      pagesData.news= data.newsPages[0]

  }

  if (newsItem){
    return newsItem
  }else {
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
            ${!news&&`
            newsPages {
              allNews {
                html
              }
              title
            }
            `}
          }`)

    if (data.newsPages)
     pagesData.news= data.newsPages[0]

    return data.news
  }
}

const Page = async ({params}:Props) => {
  const slug= params.slug
  const news= await init(slug)

  console.log(pagesData)

  if (!news) return <div></div>


  return (
      <NewsArticle news={news} slug={slug} allNews={pagesData.news? pagesData.news.allNews.html:""}/>
  );
};

export default Page