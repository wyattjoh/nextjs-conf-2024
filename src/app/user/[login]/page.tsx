import Client from "./client";
import Server from "./server";

type Props = {
  params: Promise<{
    login: string;
  }>;
};

export default async function UserPage({ params }: Props) {
  const start = Date.now();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-end sm:items-start">
        <h1 className="text-4xl font-bold">Next.js Contributor</h1>
        <a href="/" className="text-sm text-gray-500">
          &lt; Back to contributors
        </a>
        <div className="flex flex-col gap-8 min-w-[600px]">
          <Client start={start} />
          <Server start={start} params={params} />
        </div>
      </main>
    </div>
  );
}
