import type { User } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter } from "./card";
import TimeTaken from "./time-taken";
import Link from "next/link";

type Props = {
  title: string;
  contributors: User[];
  start: number;
};

export default function Contributors({ title, contributors, start }: Props) {
  return (
    <Card>
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <ul className="grid grid-cols-2 gap-4 w-full">
        {contributors.map((contributor) => (
          <li
            key={contributor.id}
            className="flex justify-between items-center"
          >
            <Link
              className="flex items-center gap-2 underline hover:text-gray-500"
              href={`/user/${contributor.name}`}
            >
              <Image
                className="rounded-full h-6 w-6 inline-block"
                src={`${contributor.avatar}&t=${encodeURIComponent(title)}`}
                alt={contributor.name}
                height={24}
                width={24}
              />
              {contributor.name}
            </Link>
            <span className="text-xs">{contributor.contributions}</span>
          </li>
        ))}
      </ul>
      <CardFooter>
        <TimeTaken start={start} />
      </CardFooter>
    </Card>
  );
}

export function ContributorsSkeleton({
  title,
  take,
}: {
  title: string;
  take: number;
}) {
  return (
    <Card>
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <ul className="grid grid-cols-2 gap-4 w-full">
        {Array.from({ length: take }).map((_, i) => (
          <li key={i} className="w-full h-[24px] bg-gray-50 animate-pulse" />
        ))}
      </ul>
      <CardFooter>
        <p>Time taken: ...</p>
      </CardFooter>
    </Card>
  );
}
