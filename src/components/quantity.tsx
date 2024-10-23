type Props = {
  quantity: Promise<number>;
};

export async function QuantityAvailable(props: Props) {
  const quantity = await props.quantity;
  if (quantity >= 10 || quantity <= 0) return null;

  return <span className="text-gray-600">only {quantity} left!</span>;
}
