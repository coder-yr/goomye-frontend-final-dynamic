import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { getCollections } from "@/lib/api";

const CollectionsSection = () => {
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
  getCollections()
      .then((res) => {
        const data = res && (res.collections ?? res);
        if (Array.isArray(data)) {
          setCollections(data);
        }
      })
      .catch(() => {
        // keep empty state
      });
  }, []);

  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.length === 0 ? (
            <div className="col-span-2 text-center text-muted-foreground py-8">No collections available.</div>
          ) : (
          collections.map((collection) => (
            <Card 
              key={collection.id}
              className={`overflow-hidden border-0 ${collection.bgClass} text-white`}
            >
              <div className="p-8 md:p-12 space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-light tracking-wider">
                    {collection.brand}
                  </div>
                  {collection.subtitle && (
                    <div className="text-sm font-bold tracking-wider">
                      {collection.subtitle}
                    </div>
                  )}
                  {collection.description && (
                    <div className="text-xs tracking-wide">
                      {collection.description}
                    </div>
                  )}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  {collection.title}
                </h2>
                <div className="space-y-1">
                  <p className="text-xl">
                    Starting at <span className="text-4xl font-bold">₹{collection.price}*</span>
                  </p>
                  <p className="text-sm text-white/90">{collection.note}</p>
                </div>
              </div>
            </Card>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
