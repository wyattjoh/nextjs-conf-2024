"use client";

import Contributor, { ContributorSkeleton } from "@/components/contributor";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ClientContainer({ start }: { start: number }) {
  const { login } = useParams();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/contributor/${login}`);
      const user = await res.json();
      setUser(user);
    };
    fetchUser();
  }, [login, start]);

  if (!user) {
    return <ContributorSkeleton title="Client" />;
  }

  return <Contributor title="Client" user={user} start={start} />;
}

type Props = {
  start: number;
};

export default function Client({ start }: Props) {
  return (
    <Suspense fallback={<ContributorSkeleton title="Client" />}>
      <ClientContainer start={start} />
    </Suspense>
  );
}
