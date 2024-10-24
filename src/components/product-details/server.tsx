import { getProduct, getQuantityAvailable } from "@/lib/db";
import ProductDetailsShared from "./shared";
import QuantityAvailable from "../quantity/server";
import AddToCart from "../add-to-cart/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetails(props: Props) {
  const { id } = await props.params;
  const product = await getProduct(parseInt(id));
  if (!product) return null;

  const quantity = getQuantityAvailable(parseInt(id));

  return (
    <ProductDetailsShared
      product={product}
      quantity={<QuantityAvailable id={product.id} quantity={quantity} />}
      addToCart={<AddToCart id={product.id} quantity={quantity} />}
    />
  );
}
