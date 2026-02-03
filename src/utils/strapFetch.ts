import { strapi } from '@strapi/client';

export const fetchSingle=async <T>(name: string)=>{
  try {
    const client=strapi({baseURL: process.env.API_URL as string, auth: process.env.API_TOKEN})

    const response= await client.single(name).find({pLevel:5} as any)

    return (response as unknown as {data: T}).data
  }catch (e){
    console.log(e)
  }
}