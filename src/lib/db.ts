import { PrismaClient, Product } from "@prisma/client";
import { getCart } from "./cart";
import { cache } from "react";

const prisma = new PrismaClient();

export const getProducts = cache(async (): Promise<Product[]> => {
  return prisma.product.findMany();
});

export const getProductsByIds = cache(
  async (ids: number[]): Promise<Product[]> => {
    return prisma.product.findMany({ where: { id: { in: ids } } });
  }
);

export const getProduct = cache(async (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({ where: { id } });
});

export const getRelatedProducts = cache(
  async (id: number, count: number): Promise<Product[]> => {
    return prisma.product.findMany({ where: { id: { not: id } }, take: count });
  }
);

const STOCK_COUNT = 12;

export const getQuantityAvailable = cache(
  async (id: number): Promise<number> => {
    const cart = await getCart();
    const quantity =
      cart.find((item) => item.product?.id === id)?.quantity ?? 0;
    return STOCK_COUNT - quantity;
  }
);
