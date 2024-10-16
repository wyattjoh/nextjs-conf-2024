import { PrismaClient } from "@prisma/client";
import { connection } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  // Ensure we don't cache the response.
  await connection();

  const contributors = await prisma.user.findMany({
    orderBy: { contributions: "desc" },
    take: 20,
  });

  return Response.json(contributors);
}
