import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {EmailInputType, IFormRequest} from "@/types/data";
// Типы данных
type ContactFormValues = IFormRequest & Record<EmailInputType, string>

interface ApiResponse {
  success: boolean;
  ok: boolean
}

// Отключаем кэширование для API роутов
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { recaptcha, name, phone, city, message, subject, email } = (await request.json()) as ContactFormValues;

    // Валидация reCAPTCHA
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        { method: 'POST' }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error()
    }

    // Проверка конфигурации SMTP
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      throw new Error('SMTP конфигурация отсутствует в переменных окружения');
    }

    // Создаем транспорт для отправки писем
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Формируем и отправляем письмо
    await transporter.sendMail({
      from: {
        name,
        address: email
      },
      to: process.env.EMAIL_TO,
      subject: `Контактная форма сайта: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style=" margin-top: 0;">Новый запрос с контактной формы</h2>
          <div style="margin-bottom: 16px;">
            <strong>От кого:</strong> ${name}
          </div>
          <div style="margin-bottom: 16px;">
            <strong>Телефон:</strong> ${phone}
          </div>   
          <div style="margin-bottom: 16px;">
            <strong>Email:</strong> ${email}
          </div>
          <div style="margin-bottom: 16px;">
            <strong>Город:</strong> ${city}
          </div>
          <div style="margin-bottom: 16px;">
            <strong>Сообщение:</strong>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${message}
          </div>
          <div style="margin-top: 24px; color: #64748b; font-size: 0.875rem; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            Это сообщение было отправлено автоматически с контактной формы сайта.
          </div>
        </div>
      `,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      ok: true
    });

  } catch (error) {
    console.error('Ошибка API:', error);

    return NextResponse.json<ApiResponse>(
        { success: false, ok: false },
        { status: 500 }
    );
  }
}