import { useParams } from "next/navigation";
import ProductDetailsShared, { ProductDetailsSkeleton } from "./shared";
import QuantityAvailableShared from "../quantity/shared";
import AddToCartShared from "../add-to-cart/shared";
import useSWR from "swr";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isProductLoading } = useSWR(
    `/api/product/${id}`,
    (url) =>
      fetch(url, { credentials: "same-origin" }).then((res) => res.json())
  );
  const { data: quantity, isLoading: isQuantityLoading } = useSWR(
    `/api/product/${id}/quantity`,
    (url) =>
      fetch(url, { credentials: "same-origin" }).then((res) => res.json())
  );

  if (isProductLoading || isQuantityLoading) return <ProductDetailsSkeleton />;

  return (
    <ProductDetailsShared
      product={product}
      quantity={<QuantityAvailableShared quantity={quantity} />}
      addToCart={<AddToCartShared id={product.id} quantity={quantity} />}
    />
  );
}
