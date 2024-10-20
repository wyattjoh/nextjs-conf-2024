import Cart, { CartSkeleton } from "@/components/cart";
import PerformanceMetrics from "@/components/performance";
import { getCart } from "@/lib/cart";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: Props) {
  const cart = getCart();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-grow p-6 lg:p-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Eco Store</h1>
            <Suspense fallback={<CartSkeleton />}>
              <Cart cart={cart} />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
      <PerformanceMetrics />
    </div>
  );
}
