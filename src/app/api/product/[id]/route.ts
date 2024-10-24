import { getProduct } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));
  if (!product) return new Response(null, { status: 404 });

  return Response.json(product);
}
