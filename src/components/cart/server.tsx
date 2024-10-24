"use client";

import { use } from "react";
import type { Cart as CartType } from "@/lib/cart";
import CartShared from "./shared";

type Props = {
  cart: Promise<CartType>;
};

export default function Cart(props: Props) {
  const cart = use(props.cart);
  return <CartShared cart={cart} />;
}
