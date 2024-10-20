import { getProducts, seedProducts } from "@/lib/db";

export async function GET() {
  await seedProducts();
  const products = await getProducts();
  return Response.json(products);
}
