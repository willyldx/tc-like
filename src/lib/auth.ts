import { cookies } from 'next/headers';
import prisma from './db';

// Exemple simple : récupère un utilisateur à partir de la session
export async function getUserFromSession() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) return null;

  // À adapter selon ton schéma Prisma
  const user = await prisma.user.findUnique({
    where: { sessionToken },
  });

  return user;
}
