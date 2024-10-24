"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

type Props = {
  type: "static" | "dynamic";
};

export default function Switcher({ type }: Props) {
  const pathname = usePathname();

  let href = pathname;
  if (type === "static") {
    href = href.replace("/static", "/dynamic");
  } else {
    href = href.replace("/dynamic", "/static");
  }

  let label;
  if (type === "static") {
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
