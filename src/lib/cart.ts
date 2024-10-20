import { Product } from "@prisma/client";
import { cookies } from "next/headers";
import { getProductsByIds } from "./db";
import { cache } from "react";

export type CartItem = {
  product: Pick<Product, "id" | "name" | "price" | "image"> | null;
  quantity: number;
};

export type Cart = CartItem[];

type EncodedCart = {
  items: Array<{
    id: number;
    quantity: number;
  }>;
};

export const getCart = cache(async (): Promise<CartItem[]> => {
  const jar = await cookies();
  const json = jar.get("cart")?.value;
  if (!json) return [];

  const encoded: EncodedCart = JSON.parse(json);

  const products = await getProductsByIds(encoded.items.map((item) => item.id));

  return encoded.items.map((item) => ({
    product: products.find((p) => p.id === item.id) ?? null,
    quantity: item.quantity,
  }));
});

export async function addToCart(id: number, quantity: number) {
  const jar = await cookies();
  const json = jar.get("cart")?.value ?? `{"items":[]}`;
  const encoded: EncodedCart = JSON.parse(json);

  const item = encoded.items.find((item) => item.id === id);
  if (item) {
    item.quantity += quantity;
  } else {
    encoded.items.push({ id, quantity });
  }

  jar.set("cart", JSON.stringify(encoded));
}

export async function removeFromCart(id: number, quantity: number = 1) {
  const jar = await cookies();
  const json = jar.get("cart")?.value ?? `{"items":[]}`;
  const encoded: EncodedCart = JSON.parse(json);

  const item = encoded.items.find((item) => item.id === id);
  if (item) {
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      encoded.items = encoded.items.filter((item) => item.id !== id);
    }
  }

  jar.set("cart", JSON.stringify(encoded));
}
