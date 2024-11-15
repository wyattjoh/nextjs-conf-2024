"use client";

import { FooterBar } from "@/components/footer-bar";
import PerformanceMetrics from "@/components/performance";
import Switcher from "@/components/switcher";
import { Globe2 } from "lucide-react";
import { Suspense } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function ClientProductLayout({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          fetch(url, {
            credentials: "same-origin",
          }).then((res) => res.json()),
      }}
    >
      <Suspense>
        <div className="min-h-screen bg-gray-100">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-grow p-6 lg:p-12">
              <div className="flex items-center gap-2 mb-8">
                <Globe2 />
                <h1 className="text-3xl font-bold text-gray-900">Eco Store</h1>
              </div>
              {children}
            </div>
          </div>
          <FooterBar>
            <Switcher type="static" />
            <PerformanceMetrics />
          </FooterBar>
        </div>
      </Suspense>
    </SWRConfig>
  );
}
