import { strapi } from '@strapi/client';
import {unstable_cache} from "next/cache";
import {INewsItem} from "@/types/data";

interface IMeta{
  "pagination": {
    "page": number
    "pageSize": number
    "pageCount": number
    "total": number
  }
}

interface IQury{
  filters?: Record<string, unknown>,
  pagination?: {
    page?: number, pageSize?: number
  },
  sort?: string
}

export const fetchSingle=async <T>(name: string)=>{
  try {
    const client=strapi({baseURL: process.env.API_URL as string, auth: process.env.API_TOKEN})

    const response= await client.single(name).find({pLevel:5} as any)

    return (response as unknown as {data: T}).data
  }catch (e){
    console.log(e)
  }
}

export const fetchColection= async <T>({name, ...query}: {name: string} & IQury)=>{
  try {
    const client=strapi({baseURL: process.env.API_URL as string, auth: process.env.API_TOKEN})

    const response= await client.collection(name).find({
      pLevel:5,
      ...query
    } as any)

    return response as unknown as {data: T[], meta: IMeta}
  }catch (e){
    console.error(e)
  }
}

export const getNews =unstable_cache(async (page: string) => {
    const pageNumber = Number(page) || 1;
    const data = await fetchColection<INewsItem>({
      name: 'newss',
      pagination: {
        page: pageNumber,
        pageSize: 10
      },
      sort: "date:desc"
    })

    if (!data) {
      return null;
    }

    return {
      news: data.data,
      pageCount: data.meta.pagination.pageCount
    }
  },
  ["news-page"],
  { tags: ["news",] }
)
