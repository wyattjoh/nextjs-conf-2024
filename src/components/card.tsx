export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm flex flex-col gap-4">
      {children}
    </div>
  );
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-gray-500">{children}</div>;
}
