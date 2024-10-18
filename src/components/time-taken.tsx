"use client";

import { useEffect, useState } from "react";

export default function TimeTaken({ start }: { start: number }) {
  const [took, setTook] = useState(0);

  useEffect(() => {
    const end = Date.now();
    const took = end - start;
    setTook(took);
  }, [start]);

  return <p>Time taken: {took.toFixed(2)}ms</p>;
}
