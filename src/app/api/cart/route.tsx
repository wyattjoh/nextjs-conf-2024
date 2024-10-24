import { getCart } from "@/lib/cart";

export async function GET(): Promise<Response> {
  const cart = await getCart();
  return Response.json(cart);
}
