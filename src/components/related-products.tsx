import Image from "next/image";
import { Card } from "./ui/card";
import { getRelatedProducts } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
  count: number;
};

export default async function RelatedProducts({ params, count }: Props) {
  const { id } = await params;
  const products = await getRelatedProducts(parseInt(id), count);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((relatedProduct) => (
        <a href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
          <Card className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Image
              src={relatedProduct.image}
              alt={relatedProduct.name}
              width={200}
              height={200}
              className="rounded-lg mb-4 mx-auto"
            />
            <h4 className="font-semibold mb-2 text-sm">
              {relatedProduct.name}
            </h4>
            <p className="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
          </Card>
        </a>
      ))}
    </div>
  );
}

export function RelatedProductsSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card className="p-4" key={index}>
          <div className="w-[200px] h-[200px] mb-2 rounded-lg bg-gray-200 animate-pulse mx-auto" />
          <div className="mb-2 h-4 w-3/4 bg-gray-100 animate-pulse rounded-lg" />
          <div className="h-10 w-1/2 bg-gray-100 animate-pulse rounded-lg" />
        </Card>
      ))}
    </div>
  );
}
