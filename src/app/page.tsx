import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Client } from "./client";
import Server from "./server";

const prisma = new PrismaClient();

async function update() {
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

export default function Home() {
  const start = Date.now();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-end sm:items-start">
        <h1 className="text-4xl font-bold">Next.js Contributors</h1>
        <div className="grid grid-cols-2 gap-8 min-w-[600px]">
          <Client start={start} />
          <Server start={start} />
        </div>
        <form action={update}>
          <button
            type="submit"
            className="border border-gray-500 text-gray-500 px-2 py-1 rounded-full text-xs hover:bg-gray-50"
          >
            Update Contributors
          </button>
        </form>
      </main>
    </div>
  );
}
