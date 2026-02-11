import { NextResponse } from 'next/server';
import {IFormRequest, TypeForm} from "@/types/data";
import {unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import axios from "axios";

interface RevalidateResponse {
  ok: boolean
}

interface ILinks{
  festivalMains: {
    bidTableLink: string
    diplomaTableLink: string
    bidNumberProjectColumn: string
  }[]
}

const getLinks= unstable_cache(async ()=>{
      const data= await fetchData<ILinks>(`
          query FestivalQuery {
            festivalMains {
              bidTableLink
              diplomaTableLink
              bidNumberProjectColumn
            }
          }`)

      if (typeof data==="string" ||!data){
        return data
      }
      return data.festivalMains[0]
    },
    ["forms-link"], {tags: ["FestivalMain"]}
)


export async function POST(request: Request): Promise<NextResponse<RevalidateResponse>>  {
  try {
    const { recaptcha, typeForm, ...form } = (await request.json()) as IFormRequest;

    // Валидация reCAPTCHA
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        { method: 'POST' }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("ошибка капчи")
    }
    //Здесь обработайте данные формы

    const tablesData= await getLinks()
    const linkKey= typeForm=="bid"? "bidTableLink" :"diplomaTableLink"

    if (!tablesData || typeof tablesData==="string")
      throw new Error("ошибка получения ссылок")

    const req= form

    if (typeForm==="bid")
      req.bidNumberProjectColumn= tablesData.bidNumberProjectColumn

    const resp= await axios.post(
      tablesData[linkKey],
      req
    )

    if (resp.data.type=="error")
      throw new Error(`Ошибка сервера: ${resp.data.message}`);

    return NextResponse.json({ ok: true });
  }catch (err){
    console.log(err)
    return NextResponse.json(
        {ok: false},
        { status: 400 }
    );
  }
}