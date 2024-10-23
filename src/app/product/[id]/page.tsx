import { Suspense } from "react";
import Image from "next/image";

import {
  getProduct,
  getProducts,
  getQuantityAvailable,
  getRelatedProducts,
} from "@/lib/db";
import { notFound } from "next/navigation";
import RelatedProducts from "@/components/related-products";
import AddToCart from "@/components/add-to-cart";

type Props = {
  params: Promise<{ id: string }>;
};

async function QuantityAvailable(props: { quantity: Promise<number> }) {
  const quantity = await props.quantity;
  if (quantity >= 10 || quantity <= 0) return null;

  return <span className="text-gray-600">only {quantity} left!</span>;
}

export default function Page(props: Props) {
  return (
    <Suspense>
      <ProductPage params={props.params} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id.toString() }));
}

async function ProductPage(props: Props) {
  const params = await props.params;
  const product = await getProduct(parseInt(params.id));
  const relatedProducts = getRelatedProducts(parseInt(params.id));
  const quantity = getQuantityAvailable(parseInt(params.id));

  if (!product) return notFound();

  return (
    <div className="mb-12 space-y-4">
      <div className="flex space-x-8 mb-8 min-h-72">
        <div className="mb-0">
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
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h3>
        <Suspense>
          <RelatedProducts products={relatedProducts} />
        </Suspense>
      </div>
    </div>
  );
}
