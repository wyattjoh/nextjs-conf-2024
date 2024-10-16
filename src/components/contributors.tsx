import type { User } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter } from "./card";

type Props = {
  title: string;
  contributors: User[];
  took: number;
};

export default function Contributors({ title, contributors, took }: Props) {
  return (
    <Card>
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <ul className="flex flex-col gap-2 min-w-[300px]">
        {contributors.map((contributor) => (
          <li key={contributor.id}>
            <div className="flex justify-between items-center">
              <a
                className="flex items-center gap-2"
                href={`/user/${contributor.name}`}
              >
                <Image
                  className="rounded-full h-6 w-6 inline-block"
                  src={contributor.avatar}
                  alt={contributor.name}
                  height={24}
                  width={24}
                />
                {contributor.name}
              </a>
              <span className="text-xs">{contributor.contributions}</span>
            </div>
          </li>
        ))}
      </ul>
      <CardFooter>
        <p>Time taken: {took.toFixed(2)}ms</p>
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
      <ul className="flex flex-col gap-2 min-w-[300px]">
        {Array.from({ length: take }).map((_, i) => (
          <li key={i} className="w-full h-[24px] bg-gray-50  animate-pulse" />
        ))}
      </ul>
      <CardFooter>
        <p>Time taken: ...</p>
      </CardFooter>
    </Card>
  );
}
