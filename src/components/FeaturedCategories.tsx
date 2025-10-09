import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import imac from "@/assets/imac.jpg";
import gamingController from "@/assets/gaming-controller.jpg";
import peripherals from "@/assets/peripherals.jpg";
import tablet from "@/assets/tablet.jpg";
import smartphone from "@/assets/smartphone.jpg";
import console from "@/assets/console.jpg";
import smartwatch from "@/assets/smartwatch.jpg";
import tabletGuide from "@/assets/tablet-guide.jpg";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const FeaturedCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.getCollections()
      .then((res) => {
        if (res && res.collections && res.collections.length) {
          setCategories(
            res.collections.map((c: any, idx: number) => ({
              id: c.id ?? idx,
              title: c.title ?? c.brand,
              image: c.image ?? "/placeholder.svg",
              hasButton: !!c.hasButton,
              buttonText: c.buttonText,
              alt: c.alt ?? c.title,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card"
            >
              <div className="p-6 space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold leading-tight min-h-[56px]">
                  {category.title}
                </h3>
                {category.hasButton && (
                  <Button variant="outline" className="w-full">
                    {category.buttonText}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
