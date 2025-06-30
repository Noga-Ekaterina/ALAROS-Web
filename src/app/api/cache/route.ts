// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import axios from "axios";

interface RevalidateRequest {
  data:{
    __typename: string
    newsPage: any
    [key: string]: string
  }
}

interface RevalidateResponse {
  success: boolean;
  revalidated?: boolean;
  tag?: string;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<RevalidateResponse>> {
  try {
    // Логируем весь запрос
    console.log('Request received:', request);

    // Получаем данные из тела запроса
    const body = (await request.json()) as RevalidateRequest;
    console.log('Request body:', body);

    const {__typename, newsPage, ...data } = body.data

    revalidateTag(__typename)

    if (newsPage)
      revalidateTag("NewsPage")

    if (__typename==="News")
      revalidateTag(`news-${data.slug}`)

    if (__typename==="Project")
      revalidateTag(`project-${data.year}-${data.number}`)

    await axios.post("http://alaros.ru/api/cache", body)

    return NextResponse.json({ success: true, revalidated: true, });
  } catch (error) {
    // Логируем ошибку
    console.error('Error in revalidate route:', error);

    // Обрабатываем ошибки
    return NextResponse.json(
        { success: false, revalidated: false, error: 'Internal Server Error' },
        { status: 500 }
    );
  }
}