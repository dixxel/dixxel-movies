import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest, response: NextResponse) => {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `consent=true` },
  });
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  const consent = request.cookies.get('consent');
  return NextResponse.json;
};
