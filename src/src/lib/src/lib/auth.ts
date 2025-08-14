import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE = 'ngl_sess';
const secret = process.env.JWT_SECRET!;

export function setSession(payload: { id: number; username: string }) {
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // important pour le local
    sameSite: 'lax',
    path: '/'
  });
}

export function clearSession() {
  cookies().delete(COOKIE);
}

export function getUserFromSession(): { id: number; username: string } | null {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return null;
  try {
    return jwt.verify(c, secret) as any;
  } catch {
    return null;
  }
}
