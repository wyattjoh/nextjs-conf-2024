type Props = {
  quantity: number;
};

export default function QuantityAvailableShared({ quantity }: Props) {
  if (quantity >= 10 || quantity <= 0) return null;

  return <span className="text-gray-600">only {quantity} left!</span>;
}
