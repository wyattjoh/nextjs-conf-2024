"use client";

import { Cart as CartType } from "@/lib/cart";
import { useEffect, useState } from "react";
import CartShared, { CartSkeleton } from "./shared";

export default function Cart() {
  const [cart, setCart] = useState<CartType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getter = async () => {
      setIsLoading(true);
      const res = await fetch("/api/cart", {
        credentials: "same-origin",
      });

      if (res.ok) {
        const cart = await res.json();
        setCart(cart);
      }
      setIsLoading(false);
    };

    getter();
  }, []);

  if (isLoading) return <CartSkeleton />;
  return <CartShared cart={cart} />;
}
