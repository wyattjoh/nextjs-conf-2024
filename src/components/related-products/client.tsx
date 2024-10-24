"use client";

import { useEffect, useState } from "react";
import RelatedProducts, { RelatedProductsSkeleton } from "./shared";
import { Product } from "@prisma/client";
import { useParams } from "next/navigation";

export default function RelatedProductsClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/product/${id}/related`);
      if (res.ok) {
        const data = await res.json();
        setRelatedProducts(data);
      }
      setIsLoading(false);
    };

    fetchRelatedProducts();
  }, [id]);

  if (isLoading) {
    return <RelatedProductsSkeleton count={3} />;
  }

  return <RelatedProducts relatedProducts={relatedProducts} />;
}
