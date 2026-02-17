import { NextResponse } from 'next/server';
import {IFormRequest, TypeForm} from "@/types/data";
import {unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import axios from "axios";
import { createDate } from '@/utils/date';
import { fetchSingle } from '@/utils/strapFetch';

interface RevalidateResponse {
  ok: boolean
}

interface ITablesData{
  bidTableLink: string
  diplomaTableLink: string
  bidNumberProjectColumn: string
  bidDateColumn: string 
}

const getLinks= unstable_cache(async ()=>{
  const data= await fetchSingle<ITablesData>("tadles-data")
  return data
},
["forms-link"], {tags: ["tables-data"]}
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

    if (typeForm==="bid"){
      req.bidNumberProjectColumn= tablesData.bidNumberProjectColumn
      if (tablesData.bidDateColumn){
        const {dayNumber, monthNumber, yearShort}= createDate()

        req[tablesData.bidDateColumn]= `${dayNumber}.${monthNumber}.${yearShort}`
      }
    }

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