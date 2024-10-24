import { Product } from "@prisma/client";
import Image from "next/image";
import { ReactNode } from "react";

export default function ProductDetailsShared({
  product,
  quantity,
  addToCart,
}: {
  product: Product;
  quantity: ReactNode;
  addToCart: ReactNode;
}) {
  return (
    <div className="flex space-x-8 mb-8 min-h-72">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={250}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          {quantity}
        </div>
        {addToCart}
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="flex space-x-8 mb-8 min-h-72">
      <div className="w-[250px] h-[250px] rounded-lg bg-gray-200 animate-pulse" />
      <div />
    </div>
  );
}
