import StaticCart from "@/components/cart/client";
import ProductDetails from "@/components/product-details/client";
import RelatedProducts from "@/components/related-products/client";

export default function StaticPage() {
  return (
    <div className="mb-12 space-y-4">
      {/* Cart component that loads statically */}
      <StaticCart />
      <ProductDetails />
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h3>
        <RelatedProducts />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
