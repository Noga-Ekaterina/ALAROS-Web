import React, { JSX} from 'react';
import "./news-article.scss"
import {INews, INewsItem} from "../../../types/data";
import NewsArticle from "@/app/news/[slug]/NewsArticle";
import {revalidateTag, unstable_cache} from "next/cache";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import {fetchColection} from "@/utils/strapFetch";

interface Props{
  params: {
    slug: string
  }
}

const init = (slug: string) =>
  (unstable_cache(
    async (slug) => {
      const data = await fetchColection<INewsItem>({
        name: 'newss',
        filters: {
          slug: { "$eq": slug }
        }
      })

      return data?.data[0] ?? undefined
    },
    ["news-article", slug],
    { tags: [`news-${slug}`] }
  ))

const Page = async ({params}:Props) => {
  const slug= params.slug

  if (slug.length>=256){
    return (
        <AnimationPage>
          <NotFoundSample title={`Тут ничего \nне нашлось`} mainText={"404"} mainTextMobile={`40\n04`}/>
        </AnimationPage>
    )
  }

  const news = await init(slug)(slug);

  if (typeof news=="string" || news===null) {
    revalidateTag(`news-${slug}`)
    return <div>произошла ошибка{news && `: ${news}`}, перезагрузите страницу</div>
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
        <NewsArticle news={news}/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Новости",
};

export default Page