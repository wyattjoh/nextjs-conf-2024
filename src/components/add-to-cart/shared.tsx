"use client";

import { addToCart } from "@/app/product/[id]/actions";
import { Button } from "../ui/button";
import { useActionState } from "react";

type Props = {
  id: number;
  quantity: number;
};

export default function AddToCartShared({ id, quantity }: Props) {
  const [message, formAction, isPending] = useActionState(addToCart, null);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="quantity" value="1" />
      <Button size="lg" disabled={quantity <= 0}>
        Add to Cart
      </Button>
      {quantity <= 0 ? (
        <div className="text-sm text-gray-500">Out of stock</div>
      ) : message && !isPending ? (
        <div className="text-sm text-gray-500">{message}</div>
      ) : null}
      {isPending && <div className="text-sm text-gray-500">Adding...</div>}
    </form>
  );
}
