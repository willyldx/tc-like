// src/lib/auth.ts
import { cookies } from 'next/headers';
import prisma from './db';
import type { User } from '@prisma/client';

export async function getUserFromSession(): Promise<User | null> {
  const raw = cookies().get('userId')?.value;
  const id = raw ? Number(raw) : NaN;
  if (!id) return null;

  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}
