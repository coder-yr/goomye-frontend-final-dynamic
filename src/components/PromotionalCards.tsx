import { Card } from "@/components/ui/card";
import earbuds from "@/assets/earbuds.jpg";
import smartTv from "@/assets/smart-tv.jpg";
import laptop from "@/assets/laptop.jpg";
import refrigerator from "@/assets/refrigerator.jpg";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const PromotionalCards: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    api.getDeals()
      .then((res) => {
        if (res && res.deals && res.deals.length) {
          // Map known product titles to public folder images
          const imageMap: Record<string, string> = {
            "Apple iMac 27”": "/apple-imac-27.jpg",
            "PlayStation 5 Slim Console": "/ps5.jpg",
            "iPad Pro 13-inch (M4): XDR Display": "/ipad-pro.jpg",
            "Xbox Series S 1TB SSD": "/xbox-series-s.jpg",
            "Apple iPhone 15 Pro Max": "/iphone-15.jpg"
          };
          setPromotions(res.deals.map((d: any, idx: number) => ({
            id: d.id ?? idx,
            title: d.title,
            image: d.image || imageMap[d.title] || "/placeholder.svg",
            price: d.price,
            subtitle: d.subtitle,
            offer: d.discount,
            isPercentage: !!d.discount,
            alt: d.alt
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo) => (
            <Card 
              key={promo.id}
              className="overflow-hidden border-0 bg-gradient-to-b from-indigo-900 via-indigo-800 to-blue-900 text-white hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6 space-y-4">
                {promo.showBrand && (
                  <div className="text-right">
                    <span className="text-2xl font-light tracking-wider">cromā</span>
                  </div>
                )}
                <h3 className="text-xl font-bold min-h-[56px]">
                  {promo.title}
                </h3>
                <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={`/images/${Array.isArray(promo.image) ? promo.image[0] : promo.image}`}
                      alt={promo.alt}
                      className="w-full h-full object-contain"
                    />
                </div>
                <div className="space-y-1">
                  {promo.isPercentage ? (
                    <p className="text-2xl font-bold">
                      {promo.offer}
                    </p>
                  ) : (
                    <>
                      <p className="text-lg">
                        Starting at <span className="text-2xl font-bold">₹{promo.price}*</span>
                      </p>
                      <p className="text-sm text-white/80">{promo.subtitle}</p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCards;
