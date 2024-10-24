import { use } from "react";
import AddToCartShared from "./shared";

type Props = {
  id: number;
  quantity: Promise<number>;
};

export default function AddToCart(props: Props) {
  const quantity = use(props.quantity);
  return <AddToCartShared id={props.id} quantity={quantity} />;
}
