import { update } from "./actions";
import { Client } from "./client";
import Server from "./server";

export default function Home() {
  const start = Date.now();

  return (
    <main className="flex flex-col gap-8 m-8">
      <h1 className="text-4xl font-bold">Next.js Contributors</h1>
      <div className="flex gap-8 lg:flex-row flex-col">
        <Client start={start} />
        <Server start={start} />
      </div>
      <form action={update}>
        <button
          type="submit"
          className="bg-gray-50 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded-full text-xs hover:bg-gray-50"
        >
          Update Contributors
        </button>
      </form>
    </main>
  );
}
