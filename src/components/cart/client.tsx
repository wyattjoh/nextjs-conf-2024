"use client";

import CartShared, { CartSkeleton } from "./shared";
import { updateQuantity } from "@/app/dynamic/product/[id]/actions";
import useSWR, { useSWRConfig } from "swr";

export default function Cart() {
  const { data: cart, isLoading } = useSWR("/api/cart", (url) =>
    fetch(url, { credentials: "same-origin" }).then((res) => res.json())
  );
  const config = useSWRConfig();
  if (isLoading) return <CartSkeleton />;

  return (
    <CartShared
      cart={cart}
      action={async (formData: FormData) => {
        await updateQuantity(formData);
        config.mutate("/api/cart");
        config.mutate(`/api/product/${formData.get("id")}/quantity`);
      }}
    />
  );
}
