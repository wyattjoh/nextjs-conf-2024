import { Suspense } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { getProduct, getQuantityAvailable, getRelatedProducts } from "@/lib/db";
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

async function ProductPage(props: Props) {
  const params = await props.params;
  const product = await getProduct(parseInt(params.id));
  const relatedProducts = getRelatedProducts(parseInt(params.id));
  const quantity = getQuantityAvailable(parseInt(params.id));

  if (!product) return notFound();

  return (
    <>
      <div className="flex space-x-8 mb-12">
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
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {product.rating} out of 5
            </span>
          </div>
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
      <div className="mt-14">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h3>
        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
}
