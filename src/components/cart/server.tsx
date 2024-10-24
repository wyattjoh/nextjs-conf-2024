"use client";

import { use } from "react";
import type { Cart as CartType } from "@/lib/cart";
import CartShared from "./shared";
import { updateQuantity } from "@/app/server/product/[id]/actions";

type Props = {
  cart: Promise<CartType>;
};

export default function Cart(props: Props) {
  const cart = use(props.cart);
  return <CartShared cart={cart} action={updateQuantity} />;
}
