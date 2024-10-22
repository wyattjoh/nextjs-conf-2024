import { Product } from "@prisma/client";
import Image from "next/image";
import { Card } from "./ui/card";
import { use } from "react";

type Props = {
  products: Promise<Product[]>;
};

export default function RelatedProducts(props: Props) {
  const products = use(props.products);

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
