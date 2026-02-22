// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

interface RevalidateRequest {
  model: string
  entry: Record<string, string>
}

interface RevalidateResponse {
  success: boolean;
  revalidated?: boolean;
  tag?: string;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<RevalidateResponse>> {
  try {
    // Получаем данные из тела запроса
    const body = (await request.json()) as RevalidateRequest;

    console.log(body)

    const {model, entry} = body

    revalidateTag(model)

    console.log(`revalidate tag: ${model}`)

    if (model==="news")
      revalidateTag(`news-${entry.slug}`)

    if (model==="project")
      revalidateTag(`project-${entry.year}-${entry.number}`)

    return NextResponse.json({ success: true, revalidated: true, });
  } catch (error) {
    // Логируем ошибку
    console.error('Error in revalidate tag:', error);

    // Обрабатываем ошибки
    return NextResponse.json(
        { success: false, revalidated: false, error: 'Internal Server Error' },
        { status: 500 }
    );
  }
}