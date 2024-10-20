"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Gauge } from "lucide-react";

type Metrics = {
  fcp?: number;
  lcp?: number;
  ttfb?: number;
};

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({});

  useEffect(() => {
    // Function to log First Contentful Paint (FCP)
    const logFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntriesByName("first-contentful-paint");
        if (entries.length > 0) {
          const fcpEntry = entries[0];
          setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
          observer.disconnect();
        }
      });
      observer.observe({ type: "paint", buffered: true });
    };

    // Function to log Largest Contentful Paint (LCP)
    const logLCP = () => {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    };

    // Function to log Time to First Byte (TTFB)
    const logTTFB = () => {
      const [pageNav] = performance.getEntriesByType("navigation");
      if (pageNav) {
        const ttfb =
          (pageNav as PerformanceResourceTiming).responseStart -
          (pageNav as PerformanceResourceTiming).requestStart;
        setMetrics((prev) => ({ ...prev, ttfb }));
      }
    };

    // Call the functions to log metrics
    logFCP();
    logLCP();
    logTTFB();

    // Cleanup function to disconnect observers if needed
    return () => {
      // Add any necessary cleanup here if observers need to be disconnected
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
        <Button variant="outline" className="fixed right-4 bottom-4">
          <Gauge />
          Core Web Vitals
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetTitle>Core Web Vitals</SheetTitle>
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
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex justify-center items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>TTFB: {ttfb}ms</span>
              </div>
              <div className="flex justify-center items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>FCP: {fcp}ms</span>
              </div>
              <div className="flex justify-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span>LCP: {lcp}ms</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PerformanceMetrics;
