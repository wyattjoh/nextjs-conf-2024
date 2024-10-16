import Contributors, { ContributorsSkeleton } from "@/components/contributors";
import { PrismaClient } from "@prisma/client";
import { connection } from "next/server";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function ContributorsContainer({
  take,
  start,
}: {
  take: number;
  start: number;
}) {
  // We always want the following database query to be uncached.
  await connection();

  const contributors = await prisma.user.findMany({
    orderBy: { contributions: "desc" },
    take,
  });
  const end = Date.now();

  return (
    <Contributors
      title="Server"
      contributors={contributors}
      took={end - start}
    />
  );
}

type Props = {
  start: number;
};

export default async function Server({ start }: Props) {
  return (
    <Suspense fallback={<ContributorsSkeleton title="Server" take={20} />}>
      <ContributorsContainer take={20} start={start} />
    </Suspense>
  );
}
