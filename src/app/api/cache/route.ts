// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

interface RevalidateRequest {
  tag: string;
}

interface RevalidateResponse {
  success: boolean;
  revalidated: boolean;
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

    const { tag } = body;

    // Проверяем, передан ли тег
    if (!tag) {
      console.log('Tag is missing in the request body');
      return NextResponse.json(
          { success: false, revalidated: false, error: 'Tag is required' },
          { status: 400 }
      );
    }

    // Логируем тег
    console.log('Revalidating tag:', tag);

    // Вызываем revalidateTag для указанного тега
    revalidateTag(tag);

    // Возвращаем успешный ответ
    return NextResponse.json({ success: true, revalidated: true, tag });
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