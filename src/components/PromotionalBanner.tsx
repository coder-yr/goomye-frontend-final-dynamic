import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const PromotionalBanner: React.FC = () => {
  const [banner, setBanner] = useState<any>({
    brand: 'cmf',
    subtitle: 'by NOTHING',
    title: 'CMF PHONE 2 PRO',
    price: '17,999',
    image: '/nothing-1.jpg',
  });

  useEffect(() => {
    api.getBanners()
      .then((res) => {
        if (res && res.banners && res.banners.length) {
          const b = res.banners[0];
          setBanner({ brand: b.tag1 || 'cmf', subtitle: b.subHeading || 'by NOTHING', title: b.heading || 'CMF PHONE 2 PRO', price: b.price || '17,999', image: b.image || '/nothing-1.jpg' });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-muted">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-16 space-y-6">
              <div className="space-y-2">
                <div className="text-xl font-bold text-muted-foreground tracking-wider">{banner.brand}</div>
                <div className="text-xs text-muted-foreground">{banner.subtitle}</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">{banner.title}</h2>
              <div className="space-y-2">
                <p className="text-2xl font-semibold">Starting at <span className="text-3xl">₹{banner.price}</span>*</p>
                <p className="text-sm text-muted-foreground">*Inclusive of all Offers</p>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">Buy now</Button>
            </div>
            <div className="hidden md:block h-full">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
