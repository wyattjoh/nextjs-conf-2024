"use client";

import CartShared, { CartSkeleton } from "./shared";
import { updateQuantity } from "@/app/server/product/[id]/actions";
import useSWR from "swr";

export default function Cart() {
  const { data: cart, isLoading } = useSWR("/api/cart", (url) =>
    fetch(url, { credentials: "same-origin" }).then((res) => res.json())
  );

  if (isLoading) return <CartSkeleton />;

  return <CartShared cart={cart} action={updateQuantity} />;
}
