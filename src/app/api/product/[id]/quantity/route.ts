import { getQuantityAvailable } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quantity = await getQuantityAvailable(parseInt(id));
  return Response.json(quantity);
}
