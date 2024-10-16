"use client";

import Contributor, { ContributorSkeleton } from "@/components/contributor";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ClientContainer({ start }: { start: number }) {
  const { login } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [took, setTook] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/contributor/${login}`);
      const user = await res.json();
      const end = Date.now();
      setTook(end - start);
      setUser(user);
    };
    fetchUser();
  }, [login, start]);

  if (!user) {
    return <ContributorSkeleton title="Client" />;
  }

  return <Contributor title="Client" user={user} took={took} />;
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
