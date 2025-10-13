import { Package, Truck, Tv, Tag, Percent, Crown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { getContent } from "@/lib/api";

const CuratedSection = () => {
  const [items, setItems] = useState<any[]>([]);

  const iconMap: Record<string, any> = useMemo(() => ({
    Package,
    Truck,
    Tv,
    Tag,
    Percent,
    Crown,
  }), []);

  useEffect(() => {
  getContent("curated")
      .then((res) => {
        const data = res && (res.items ?? []);
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Exclusively Curated For You</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || Package;
            return (
              <button
                key={item.id}
                className="flex flex-col items-center justify-center w-20 h-20 bg-gray-900 hover:bg-gray-800 rounded-2xl transition-colors duration-300"
                aria-label={item.label}
              >
                {item.image ? (
                  <img src={item.image} alt={item.label || item.alt || "Curated item"} className="h-8 w-8 object-contain" />
                ) : (
                  <Icon className="h-8 w-8 text-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedSection;
