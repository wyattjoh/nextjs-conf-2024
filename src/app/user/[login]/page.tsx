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
    <main className="flex flex-col gap-8 m-8">
      <h1 className="text-4xl font-bold">Next.js Contributor</h1>
      <a href="/" className="text-sm text-gray-500">
        &lt; Back to contributors
      </a>
      <div className="flex gap-8">
        <Client start={start} />
        <Server start={start} params={params} />
      </div>
    </main>
  );
}
