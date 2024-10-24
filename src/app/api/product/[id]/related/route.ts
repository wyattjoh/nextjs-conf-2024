import { getRelatedProducts } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const related = await getRelatedProducts(parseInt(id), 3);
  return Response.json(related);
}
