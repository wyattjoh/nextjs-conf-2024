import { Suspense } from "react";

import RelatedProducts, {
  RelatedProductsSkeleton,
} from "@/components/related-products";
import ProductDetails, {
  ProductDetailsSkeleton,
} from "@/components/product-details";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  return (
    <div className="mb-12 space-y-4">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h3>
        <Suspense fallback={<RelatedProductsSkeleton count={3} />}>
          <RelatedProducts params={params} count={3} />
        </Suspense>
      </div>
    </div>
  );
}
