import { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetailsShared, { ProductDetailsSkeleton } from "./shared";
import QuantityAvailableShared from "../quantity/shared";
import AddToCartShared from "../add-to-cart/shared";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    };

    fetchProduct();

    const fetchQuantity = async () => {
      const res = await fetch(`/api/product/${id}/quantity`);
      if (res.ok) {
        const data = await res.json();
        setQuantity(data);
      }
    };

    fetchQuantity();
  }, [id]);

  if (!product || !quantity) return <ProductDetailsSkeleton />;

  return (
    <ProductDetailsShared
      product={product}
      quantity={<QuantityAvailableShared quantity={quantity} />}
      addToCart={<AddToCartShared id={product.id} quantity={quantity} />}
    />
  );
}
