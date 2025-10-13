import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { getContent } from "@/lib/api";

const BrandedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  getContent("branded")
      .then((res) => {
        const items = res && (res.items ?? []);
        if (Array.isArray(items)) setProducts(items);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden border-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-800 text-white hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6 space-y-4">
                {product.brand && (
                  <div className="text-center space-y-1">
                    {product.logo ? (
                      <div className="text-sm tracking-wider">{product.logo}</div>
                    ) : (
                      <div className="text-xl font-bold tracking-wider">{product.brand}</div>
                    )}
                  </div>
                )}
                <h3 className="text-xl font-bold text-center min-h-[56px]">
                  {product.title}
                  {product.subtitle && (
                    <>
                      <br />
                      {product.subtitle}
                    </>
                  )}
                </h3>
                <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-lg">
                    Starting at <span className="text-2xl font-bold">₹{product.price}*</span>
                  </p>
                  <p className="text-sm text-white/80">*Inclusive of all Offers</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandedProducts;
