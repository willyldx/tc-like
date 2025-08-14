import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: 'missing' }, { status: 400 });

  const hash = await bcrypt.hash(password, 12);
  try {
    const user = await prisma.user.create({ data: { username: username.toLowerCase(), passwordHash: hash }});
    return NextResponse.json({ ok: true, user: { id: user.id, username: user.username }});
  } catch {
    return NextResponse.json({ error: 'username_taken' }, { status: 409 });
  }
}
