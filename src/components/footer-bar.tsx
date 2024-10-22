type Props = {
  children: React.ReactNode;
};

export function FooterBar({ children }: Props) {
  return (
    <div className="fixed right-4 bottom-4 flex items-center gap-4">
      {children}
    </div>
  );
}
