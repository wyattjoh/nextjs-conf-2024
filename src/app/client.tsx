"use client";

import type { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Contributors, { ContributorsSkeleton } from "@/components/contributors";

export function Client() {
  const [contributors, setContributors] = useState<User[]>([]);
  const [took, setTook] = useState(0);

  useEffect(() => {
    const start = performance.now();
    fetch("/api/contributors")
      .then((res) => res.json())
      .then((users) => {
        const end = performance.now();
        setTook(end - start);
        setContributors(users);
      });
  }, []);

  if (contributors.length === 0) {
    return <ContributorsSkeleton title="Client" take={20} />;
  }

  return (
    <Contributors title="Client" contributors={contributors} took={took} />
  );
}
