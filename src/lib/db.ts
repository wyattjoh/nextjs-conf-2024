import { PrismaClient, Product } from "@prisma/client";
import { getCart } from "./cart";

const prisma = new PrismaClient();

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  return prisma.product.findMany({ where: { id: { in: ids } } });
}

export async function getProduct(id: number): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}

export async function getRelatedProducts(id: number): Promise<Product[]> {
  return prisma.product.findMany({ where: { id: { not: id } }, take: 3 });
}

export async function getQuantityAvailable(id: number): Promise<number> {
  const cart = await getCart();
  const quantity = cart.find((item) => item.product?.id === id)?.quantity ?? 0;
  return 12 - quantity;
}

export async function seedProducts() {
  await prisma.product.createMany({
    data: [
      {
        name: "Eco-Friendly Water Bottle",
        description:
          "Stay hydrated in style with our sleek, sustainable water bottle. Made from recycled materials, this 20oz bottle keeps your drinks cold for 24 hours or hot for 12 hours.",
        image: "/thom-holmes-nWy_OyaAWdU-unsplash.jpg",
        price: 24.99,
        rating: 4.5,
      },
      {
        name: "Reusable Coffee Cup",
        description:
          "Say goodbye to disposable coffee cups with our durable, reusable coffee cup. Made from recycled materials, this 12oz cup is perfect for on-the-go coffee.",
        image: "/matthew-sleeper-Spdu7YT1O00-unsplash.jpg",
        price: 19.99,
        rating: 4.5,
      },
      {
        name: "Bamboo Utensil Set",
        description:
          "Keep your kitchen clean and green with our set of bamboo utensils. Made from sustainable bamboo, these utensils are durable and lightweight, perfect for any meal.",
        image: "/maria-ilves-XXRyh-ybxDs-unsplash.jpg",
        price: 14.99,
        rating: 4.5,
      },
      {
        name: "Organic Cotton Tote Bag",
        description:
          "Say goodbye to plastic bags with our durable, reusable cotton tote bag. Made from organic cotton, this bag is perfect for groceries, shopping, and more.",
        image: "/trew-xT4pNx4KyJY-unsplash.jpg",
        price: 9.99,
        rating: 4.5,
      },
    ],
  });
}
