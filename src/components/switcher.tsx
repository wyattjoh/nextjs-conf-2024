"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

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
    label = "Go to Server";
  } else {
    label = "Go to Client";
  }

  return (
    <Button asChild variant="outline">
      <a href={href}>{label}</a>
    </Button>
  );
}
