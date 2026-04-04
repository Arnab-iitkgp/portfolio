import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { config } from 'dotenv';
import { resolve } from 'path';

if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(process.cwd(), '.env.local') });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.RESEND_API_KEY ? [process.env.CONTACT_EMAIL || 'me@example.com'] : [], // We need their email securely stored if using onboarding
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
