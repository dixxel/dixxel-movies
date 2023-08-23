import resend from '@/lib/resend';
import { NextRequest, NextResponse } from 'next/server';
import ContactSent from '../../../../../react-email/emails/ContactEmail';

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { email, subject, message } = await request.json();

  try {
    const emailResponse = await resend.emails.send({
      from: 'dixxel.io <support@dixxel.io>',
      to: email,
      subject: 'Inquiry received!',
      react: ContactSent({ subject, message }),
    });

    const discordResponse = await fetch(
      'https://discord.com/api/webhooks/1130270217088540803/iVixCZz2AtpiMFXKM_MaVVPV93Jtp8TX055EoYw0S_gmOiBD4NLNZIqE_LZpyNCBO4U8',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: 'dixxel.io contact form',
          embeds: [
            {
              author: {
                name: email,
              },
              title: subject,
              description: message,
            },
          ],
        }),
      }
    );

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
};
