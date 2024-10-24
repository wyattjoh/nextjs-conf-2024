import Cart from "@/components/cart/server";
import { CartSkeleton } from "@/components/cart/shared";
import { FooterBar } from "@/components/footer-bar";
import PerformanceMetrics from "@/components/performance";
import Switcher from "@/components/switcher";
import { getCart } from "@/lib/cart";
import { Globe2 } from "lucide-react";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: Props) {
  const cart = getCart();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow p-6 lg:p-12">
          <div className="flex items-center gap-2 mb-8">
            <Globe2 />
            <h1 className="text-3xl font-bold text-gray-900">Eco Store</h1>
            <Suspense fallback={<CartSkeleton />}>
              <Cart cart={cart} />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
      <FooterBar>
        <Suspense>
          <Switcher type="server" />
        </Suspense>
        <PerformanceMetrics />
      </FooterBar>
    </div>
  );
}
