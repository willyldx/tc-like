import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromSession } from '@/lib/auth';

export async function GET() {
  const me = getUserFromSession();
  if (!me) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const msgs = await prisma.message.findMany({
    where: { userId: me.id },
    orderBy: { createdAt: 'desc' },
    take: 200
  });

  return NextResponse.json({ ok: true, messages: msgs });
}
