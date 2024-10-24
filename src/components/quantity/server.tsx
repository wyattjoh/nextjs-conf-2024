"use client";

import { use } from "react";
import QuantityAvailableShared from "./shared";

type Props = {
  id: number;
  quantity: Promise<number>;
};

export default function QuantityAvailable(props: Props) {
  const quantity = use(props.quantity);
  return <QuantityAvailableShared quantity={quantity} />;
}
