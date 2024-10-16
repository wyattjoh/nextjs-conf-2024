import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { connection } from "next/server";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function update() {
  "use server";

  const contributors = await fetch(
    "https://api.github.com/repos/vercel/next.js/contributors"
  ).then((res) => res.json());

  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.user.createMany({
      data: contributors.map(
        (contributor: {
          id: number;
          login: string;
          contributions: number;
        }) => ({
          id: contributor.id,
          name: contributor.login,
          contributions: contributor.contributions,
        })
      ),
    }),
  ]);

  revalidatePath("/");
}

function ContributorsSkeleton({ take }: { take: number }) {
  return (
    <>
      <ul className="flex flex-col gap-2 min-w-[500px]">
        {Array.from({ length: take }).map((_, i) => (
          <li key={i} className="w-full h-[24px] bg-gray-50  animate-pulse" />
        ))}
      </ul>
      <div className="text-xs text-gray-500">
        <p className="flex items-center">
          Time taken:{" "}
          <span className="inline-block bg-gray-50 w-20 h-4 animate-pulse ml-1" />
        </p>
      </div>
    </>
  );
}

async function Contributors({ take }: { take: number }) {
  // We always want the following database query to be uncached.
  await connection();

  const start = performance.now();
  const contributors = await prisma.user.findMany({
    orderBy: { contributions: "desc" },
    take,
  });
  const end = performance.now();

  return (
    <>
      <ul className="flex flex-col gap-2 min-w-[500px]">
        {contributors.map((contributor) => (
          <li key={contributor.id}>
            <div className="flex justify-between items-center">
              {contributor.name}
              <span className="text-xs">{contributor.contributions}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-xs text-gray-500">
        <p>Time taken: {(end - start).toFixed(2)}ms</p>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-end sm:items-start">
        <h1 className="text-4xl font-bold">Next.js Contributors</h1>
        <Suspense fallback={<ContributorsSkeleton take={20} />}>
          <Contributors take={20} />
        </Suspense>
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
