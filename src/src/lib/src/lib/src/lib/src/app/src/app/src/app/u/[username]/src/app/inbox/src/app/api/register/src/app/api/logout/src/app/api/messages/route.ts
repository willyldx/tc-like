import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { allow } from '@/lib/ratelimit';

export async function POST(req: Request) {
  const { username, body } = await req.json();
  if (!username || !body || body.length > 2000)
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') || '0.0.0.0').split(',')[0].trim();
  const gate = allow(ip, 8, 60_000); // 8 req/min/IP
  if (!gate.ok) return NextResponse.json({ error: 'rate_limited', retryAfterMs: gate.retryAfterMs }, { status: 429 });

  const user = await prisma.user.findUnique({ where: { username: username.toLowerCase() }});
  if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });

  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
  const ua = req.headers.get('user-agent') || '';
  await prisma.message.create({ data: { userId: user.id, body, ipHash, userAgent: ua.slice(0, 255) }});

  return NextResponse.json({ ok: true });
}
