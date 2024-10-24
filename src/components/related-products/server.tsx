import { use } from "react";
import RelatedProductsShared from "./shared";
import { getRelatedProducts } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
  count: number;
};

export default async function RelatedProducts(props: Props) {
  const { id } = use(props.params);
  const relatedProducts = await getRelatedProducts(parseInt(id), props.count);

  return <RelatedProductsShared relatedProducts={relatedProducts} />;
}
