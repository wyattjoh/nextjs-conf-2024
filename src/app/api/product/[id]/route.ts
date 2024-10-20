import { getProduct } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const product = await getProduct(parseInt(params.id));
  if (!product) return new Response(null, { status: 404 });

  return Response.json(product);
}
