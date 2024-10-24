"use client";

import RelatedProducts, { RelatedProductsSkeleton } from "./shared";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function RelatedProductsClient() {
  const { id } = useParams<{ id: string }>();
  const { data: relatedProducts, isLoading } = useSWR(
    `/api/product/${id}/related`,
    (url) =>
      fetch(url, { credentials: "same-origin" }).then((res) => res.json())
  );

  if (isLoading) return <RelatedProductsSkeleton count={3} />;

  return <RelatedProducts relatedProducts={relatedProducts} />;
}
