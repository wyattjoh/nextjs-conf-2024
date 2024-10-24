import { getProducts } from "@/lib/db";

export async function GET() {
  const products = await getProducts();
  return Response.json(products);
}
