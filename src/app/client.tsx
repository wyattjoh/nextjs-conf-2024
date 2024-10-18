"use client";

import type { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Contributors, { ContributorsSkeleton } from "@/components/contributors";

type Props = {
  start: number;
};

export function Client({ start }: Props) {
  const [contributors, setContributors] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/contributors")
      .then((res) => res.json())
      .then((users) => {
        setContributors(users);
      });
  }, [start]);

  if (contributors.length === 0) {
    return <ContributorsSkeleton title="Client" take={20} />;
  }

  return (
    <Contributors title="Client" contributors={contributors} start={start} />
  );
}
