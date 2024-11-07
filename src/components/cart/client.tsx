"use client";

import CartShared, { CartSkeleton } from "./shared";
import { updateQuantity } from "@/app/dynamic/product/[id]/actions";
import { Cart } from "@/lib/cart";
import useSWR, { useSWRConfig } from "swr";

export default function StaticCart() {
  // Renders statically, but requires hydration and the
  // fetch call in order to display the cart.
  const { data: cart, isLoading } = useSWR<Cart>("/api/cart");
  const config = useSWRConfig();

  if (isLoading || !cart) return <CartSkeleton />;

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
