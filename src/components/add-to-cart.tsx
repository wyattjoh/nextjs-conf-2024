"use client";

import { addToCart } from "@/app/product/[id]/actions";
import { Button } from "./ui/button";
import { use, useActionState } from "react";

type Props = {
  id: number;
  quantity: Promise<number>;
};

export default function AddToCart(props: Props) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  const quantity = use(props.quantity);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={props.id} />
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
