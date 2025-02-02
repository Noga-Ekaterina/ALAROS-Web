// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

interface RevalidateRequest {
  data:{
    __typename: string
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

    const {__typename } = body.data;

    if (__typename==="Festival" || __typename==="Jury" || __typename==="ProtectionsDay" ||__typename==="FormInput" || __typename==="Project"){
      revalidateTag("festival");

      return NextResponse.json({ success: true, revalidated: true, });
    }
    else if (__typename==="Home" || __typename==="News"){
      revalidateTag('home')

      return NextResponse.json({ success: true, revalidated: true, });
    }

    // Возвращаем успешный ответ
    return NextResponse.json({ success: true, });
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