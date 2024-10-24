"use client";

import type { Cart } from "@/lib/cart";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { updateQuantity } from "@/app/product/[id]/actions";

type Props = {
  cart: Cart;
};

export default function CartShared({ cart }: Props) {
  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
        0
      ),
    [cart]
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed right-4 top-4">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription asChild>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) =>
                  item.product ? (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex space-x-4 items-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          loading="lazy"
                          className="rounded-md mr-4"
                        />
                        <div className="">
                          <p className="font-semibold whitespace-nowrap">
                            <a href={`/product/${item.product.id}`}>
                              {item.product.name}
                            </a>
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <form action={updateQuantity}>
                          <input
                            type="hidden"
                            name="id"
                            value={item.product.id}
                          />
                          <input type="hidden" name="quantity" value="-1" />
                          <Button size="icon" variant="outline">
                            <Minus className="h-4 w-4" />
                          </Button>
                        </form>
                        <span>{item.quantity}</span>
                        <form action={updateQuantity}>
                          <input
                            type="hidden"
                            name="id"
                            value={item.product.id}
                          />
                          <input type="hidden" name="quantity" value="1" />
                          <Button size="icon" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  ) : null
                )}
                <div className="pt-4 border-t">
                  <p className="font-semibold text-lg">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export function CartSkeleton() {
  return (
    <Button variant="outline" className="fixed right-4 top-4">
      <ShoppingCart className="h-5 w-5 mr-2" />
      Cart
    </Button>
  );
}
