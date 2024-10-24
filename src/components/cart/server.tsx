import { getCart } from "@/lib/cart";
import CartShared from "./shared";
import { updateQuantity } from "@/app/dynamic/product/[id]/actions";

export default async function Cart() {
  const cart = await getCart();
  return <CartShared cart={cart} action={updateQuantity} />;
}
