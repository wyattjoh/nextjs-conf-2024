import { Suspense } from "react";

import RelatedProducts from "@/components/related-products/server";
import ProductDetails from "@/components/product-details/server";
import { ProductDetailsSkeleton } from "@/components/product-details/shared";
import { RelatedProductsSkeleton } from "@/components/related-products/shared";
import DynamicCart from "@/components/cart/server";
import { CartSkeleton } from "@/components/cart/shared";

type Props = {
  params: Promise<{ id: string }>;
};

export default function DynamicPage({ params }: Props) {
  return (
    <div className="mb-12 space-y-4">
      <Suspense fallback={<CartSkeleton />}>
        {/* Cart component that loads dynamically 
            (uses cookies() to read the cart data)
        */}
        <DynamicCart />
      </Suspense>
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
