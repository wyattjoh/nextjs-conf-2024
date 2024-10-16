import type { User } from "@prisma/client";

type Props = {
  title: string;
  contributors: User[];
  took: number;
};

export default function Contributors({ title, contributors, took }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <ul className="flex flex-col gap-2 min-w-[300px]">
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
        <p>Time taken: {took}ms</p>
      </div>
    </div>
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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <ul className="flex flex-col gap-2 min-w-[300px]">
        {Array.from({ length: take }).map((_, i) => (
          <li key={i} className="w-full h-[24px] bg-gray-50  animate-pulse" />
        ))}
      </ul>
      <div className="text-xs text-gray-500">
        <p>Time taken: ...</p>
      </div>
    </div>
  );
}
