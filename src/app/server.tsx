import Contributors, { ContributorsSkeleton } from "@/components/contributors";
import { PrismaClient } from "@prisma/client";
import { connection } from "next/server";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function ContributorsContainer({ take }: { take: number }) {
  // We always want the following database query to be uncached.
  await connection();

  const start = performance.now();
  const contributors = await prisma.user.findMany({
    orderBy: { contributions: "desc" },
    take,
  });
  const end = performance.now();

  return (
    <Contributors
      title="Server"
      contributors={contributors}
      took={end - start}
    />
  );
}

export default async function Server() {
  return (
    <Suspense fallback={<ContributorsSkeleton title="Server" take={20} />}>
      <ContributorsContainer take={20} />
    </Suspense>
  );
}
