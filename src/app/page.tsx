import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col">
        <div className="flex-grow p-6">
          <div className="flex items-center gap-2 mb-8">
            <Globe2 />
            <h1 className="text-3xl font-bold text-gray-900">Eco Store</h1>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button size="lg" asChild variant="outline">
            <a href="/static/product/1">Static</a>
          </Button>
          <Button size="lg" asChild variant="outline">
            <a href="/dynamic/product/1">Dynamic</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
