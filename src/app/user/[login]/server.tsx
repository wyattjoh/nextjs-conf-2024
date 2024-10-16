import Contributor, { ContributorSkeleton } from "@/components/contributor";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

type Props = {
  start: number;
  params: Promise<{
    login: string;
  }>;
};

const prisma = new PrismaClient();

async function ServerContainer({ start, params }: Props) {
  const { login } = await params;

  // We always want the following database query to be uncached.
  await connection();

  const user = await prisma.user.findUnique({
    where: {
      name: login,
    },
  });

  if (!user) {
    notFound();
  }

  return <Contributor title="Server" user={user} took={Date.now() - start} />;
}

export default function Server({ start, params }: Props) {
  return (
    <Suspense fallback={<ContributorSkeleton title="Server" />}>
      <ServerContainer start={start} params={params} />
    </Suspense>
  );
}
