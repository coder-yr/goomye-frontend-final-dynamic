import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { getSafeImageUrl } from "@/lib/imageUtils";
import React, { useEffect, useState } from "react";
import { getDeals } from "@/lib/api";

const SummerDeals = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  getDeals()
      .then((res) => {
        const data = res && (res.deals ?? res);
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Summer Special Deals</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product, idx) => (
                <CarouselItem key={product.id ?? idx} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <ProductCard
                    {...product}
                    image={getSafeImageUrl(product.image)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SummerDeals;
