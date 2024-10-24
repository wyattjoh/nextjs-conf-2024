"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

type Props = {
  type: "client" | "server";
};

export default function Switcher({ type }: Props) {
  const pathname = usePathname();

  let href = pathname;
  if (type === "client") {
    href = href.replace("/client", "/server");
  } else {
    href = href.replace("/server", "/client");
  }

  let label;
  if (type === "client") {
    label = (
      <p className="flex items-center gap-2">
        <b>Static</b> <RefreshCcw /> Switch to Dynamic
      </p>
    );
  } else {
    label = (
      <p className="flex items-center gap-2">
        <b>Dynamic</b> <RefreshCcw /> Switch to Static
      </p>
    );
  }

  return (
    <Button asChild>
      <a href={href}>{label}</a>
    </Button>
  );
}
