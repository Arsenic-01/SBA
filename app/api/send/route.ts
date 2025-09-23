import { NextResponse } from 'next/server';
import ContactEmail from '@/emails/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const { email, name, subject, message } = await request.json();

  try {
    const data = await resend.batch.send([
      {
        from: 'Contact@sunilbhor.com',
        to: 'vedbhor25@gmail.com',
        subject: subject,
        text: message,
        react: ContactEmail({ name, email, subject, message }),
      },
      {
        from: 'Contact@sunilbhor.com',
        to: 'sdbhor@gmail.com',
        subject: subject,
        text: message,
        react: ContactEmail({ name, email, subject, message }),
      },
    ]);

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
