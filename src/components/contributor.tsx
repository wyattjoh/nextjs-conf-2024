import { User } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter } from "./card";
import TimeTaken from "./time-taken";

export default function Contributor({
  title,
  user,
  start,
}: {
  title: string;
  user: User;
  start: number;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Loaded from {title}</h2>
        <div className="flex gap-6 items-center">
          <Image
            className="rounded-full inline-block h-48 w-48"
            src={`${user.avatar}&t=${encodeURIComponent(title)}`}
            alt={user.name}
            height={200}
            width={200}
            priority
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">
              {user.contributions} contributions
            </p>
          </div>
        </div>
      </div>
      <CardFooter>
        <TimeTaken start={start} />
      </CardFooter>
    </Card>
  );
}

export function ContributorSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <h2 className="text-lg font-bold">Loaded from {title}</h2>
      <div className="flex gap-6 items-center">
        <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
      <CardFooter>
        <p>Time taken: ...</p>
      </CardFooter>
    </Card>
  );
}
