"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

type Metrics = {
  fcp?: number;
  lcp?: number;
  ttfb?: number;
};

function PerformancePill(props: {
  value: number;
  ranges: [number, number, number];
}) {
  return (
    <div
      className={cn("border rounded-full px-2 py-1 inline-block text-xs", {
        "text-green-500 border-green-500": props.value < props.ranges[1],
        "text-yellow-500 border-yellow-500":
          props.value >= props.ranges[1] && props.value < props.ranges[2],
        "text-red-500 border-red-500": props.value >= props.ranges[2],
      })}
    >
      {props.value < props.ranges[1]
        ? "Good"
        : props.value >= props.ranges[2]
        ? "Poor"
        : "Needs Improvement"}
    </div>
  );
}

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({});

  useEffect(() => {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName("first-contentful-paint");
      if (entries.length > 0) {
        const fcpEntry = entries[0];
        setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
        fcpObserver.disconnect();
      }
    });

    fcpObserver.observe({ type: "paint", buffered: true });

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
      lcpObserver.disconnect();
    });

    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    const [pageNav] = performance.getEntriesByType("navigation");
    if (pageNav) {
      const ttfb =
        (pageNav as PerformanceResourceTiming).responseStart -
        (pageNav as PerformanceResourceTiming).requestStart;
      setMetrics((prev) => ({ ...prev, ttfb }));
    }

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
    };
  }, []);

  const round = (value: number) => Math.round(value * 100) / 100;

  const ttfb = metrics.ttfb ? round(metrics.ttfb) : 0;
  const fcp = metrics.fcp ? round(metrics.fcp) : 0;
  const lcp = metrics.lcp ? round(metrics.lcp) : 0;

  const maxTime = Math.max(ttfb, fcp, lcp);
  const scale = 100 / maxTime;

  const ttfbWidth = ttfb * scale;
  const fcpWidth = fcp * scale;
  const lcpWidth = lcp * scale;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-400">
          <Gauge />
          Core Web Vitals
          {lcp > 0 && (
            <span className="absolute -top-4 -right-2 bg-white text-muted-foreground rounded-md flex items-center justify-center text-xs p-1">
              {lcp}ms
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-4">
        <div>
          <SheetTitle className="flex items-center gap-2">
            <Gauge /> Core Web Vitals
          </SheetTitle>
          <SheetDescription>
            Core Web Vitals are a set of metrics that measure the performance of
            a website.
          </SheetDescription>
        </div>
        <div className="w-full space-y-2">
          <div className="space-y-2">
            <div
              className="h-12 w-full bg-gray-200 relative flex flex-col overflow-hidden rounded-md"
              role="img"
              aria-label="Web Vitals Timeline"
            >
              <span
                className="h-full bg-green-500"
                style={{ width: `${ttfbWidth}%` }}
                role="presentation"
                aria-hidden="true"
              ></span>
              <span
                className="h-full bg-blue-500"
                style={{ width: `${fcpWidth}%` }}
                role="presentation"
                aria-hidden="true"
              ></span>
              <span
                className="h-full bg-purple-500"
                style={{ width: `${lcpWidth}%` }}
                role="presentation"
                aria-hidden="true"
              ></span>
            </div>
            <div className="flex justify-between text-sm">
              <span>0ms</span>
              <span>{maxTime.toFixed(2)}ms</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm font-bold">
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span>TTFB: {ttfb}ms</span>
                </div>
                <PerformancePill value={ttfb} ranges={[0, 800, 1800]} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span>FCP: {fcp}ms</span>
                </div>
                <PerformancePill value={fcp} ranges={[0, 1800, 3000]} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span>LCP: {lcp}ms</span>
                </div>
                <PerformancePill value={lcp} ranges={[0, 2500, 4000]} />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PerformanceMetrics;
