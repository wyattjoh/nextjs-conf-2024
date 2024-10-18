import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function update() {
  "use server";

  const contributors = await fetch(
    "https://api.github.com/repos/vercel/next.js/contributors",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.user.createMany({
      data: contributors.map(
        (contributor: {
          id: number;
          login: string;
          avatar_url: string;
          contributions: number;
        }) => ({
          id: contributor.id,
          name: contributor.login,
          avatar: contributor.avatar_url,
          contributions: contributor.contributions,
        })
      ),
    }),
  ]);

  revalidatePath("/");
}
