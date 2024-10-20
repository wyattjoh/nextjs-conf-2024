"use server";
import * as cart from "@/lib/cart";
import { setTimeout } from "timers/promises";

export async function addToCart(prevState: unknown, formData: FormData) {
  await setTimeout(200);

  const id = formData.get("id");
  if (!id || typeof id !== "string") return "Invalid product ID";

  const quantity = formData.get("quantity");
  if (!quantity || typeof quantity !== "string") return "Invalid quantity";

  await cart.addToCart(parseInt(id), parseInt(quantity));

  return "Added to cart";
}

export async function updateQuantity(formData: FormData) {
  const id = formData.get("id");
  if (!id || typeof id !== "string") return;

  const quantity = formData.get("quantity");
  if (!quantity || typeof quantity !== "string") return;

  const parsedQuantity = parseInt(quantity);
  const parsedID = parseInt(id);

  if (parsedQuantity < 0) {
    await cart.removeFromCart(parsedID, -parsedQuantity);
  } else {
    await cart.addToCart(parsedID, parsedQuantity);
  }
}

export async function removeFromCart(formData: FormData) {
  const id = formData.get("id");
  if (!id || typeof id !== "string") return;

  await cart.removeFromCart(parseInt(id));
}
