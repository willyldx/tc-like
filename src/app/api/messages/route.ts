// src/app/api/messages/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserFromSession } from '@/lib/auth';

export async function GET() {
  const me = await getUserFromSession();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const msgs = await prisma.message.findMany({
    where: { userId: me.id },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return NextResponse.json(msgs);
}

export async function POST(req: Request) {
  const me = await getUserFromSession();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { body } = await req.json();
  if (!body || typeof body !== 'string') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const msg = await prisma.message.create({
    data: { body, userId: me.id, ipHash: null, userAgent: null },
  });
  return NextResponse.json(msg, { status: 201 });
}
