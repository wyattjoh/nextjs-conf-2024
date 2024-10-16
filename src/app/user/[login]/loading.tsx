export default function Loading() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-end sm:items-start">
        <div className="flex flex-col gap-8 row-start-2 items-end sm:items-start">
          <div className="flex gap-6 items-center">
            <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-48 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-4 w-48 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
