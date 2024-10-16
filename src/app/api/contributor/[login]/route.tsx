import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { connection } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ login: string }> }
) {
  const { login } = await params;

  // Ensure we don't cache the response.
  await connection();

  const user = await prisma.user.findUnique({
    where: {
      name: login,
    },
  });

  if (!user) {
    return notFound();
  }

  return Response.json(user);
}
