import { getProduct, getQuantityAvailable } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddToCart from "./add-to-cart";
import { QuantityAvailable } from "./quantity";

export function ProductDetailsSkeleton() {
  return (
    <div className="flex space-x-8 mb-8 min-h-72">
      <div className="w-[250px] h-[250px] rounded-lg bg-gray-200 animate-pulse" />
    </div>
  );
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quantity = getQuantityAvailable(parseInt(id));
  const product = await getProduct(parseInt(id));
  if (!product) return notFound();

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
          <Suspense>
            <QuantityAvailable quantity={quantity} />
          </Suspense>
        </div>
        <Suspense>
          <AddToCart id={product.id} quantity={quantity} />
        </Suspense>
      </div>
    </div>
  );
}
