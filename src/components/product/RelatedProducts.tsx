import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RelatedProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Xbox Series S 1TB SSD",
      image: "/images/xbox-series-s.jpg",
      description: "All-Digital Console Includes 4K Gaming 4K Streaming Carbon Black.",
      price: 499,
      installments: "Buy in installments with Goomneys Wallet",
      colors: ["bg-black"],
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro Max",
      image: "/images/iphone-15-pro-max.png",
      description: "256GB, Natural Titanium - Unlocked (Renewed), Unlocked for All Carriers",
      price: 1299,
      installments: "Buy in installments with Goomneys Wallet",
      colors: ["bg-black", "bg-purple-600", "bg-blue-500", "bg-gray-300"],
    },
    {
      id: 3,
      name: 'iMac 24" (2021)',
      image: "/images/apple-imac-27.jpg",
      description: "Retina 4.5K, 8GB, 256GB SSD, 8-core GPU, Orange, M1 Kit",
      price: 1999,
      installments: "Buy in installments with Goomneys Wallet",
      colors: ["bg-black", "bg-blue-600", "bg-orange-500", "bg-cyan-400"],
    },
  ];

  const productsPerPage = 3;
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary uppercase">Related Products</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentPage + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-6 space-y-4">
            {/* Product Image */}
            <div className="bg-muted/30 rounded-lg aspect-square flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Product Info */}
            <div>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {product.installments}
                </Badge>
              </div>

              <div className="flex items-center gap-3 mb-4">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`w-6 h-6 rounded-full border-2 border-border hover:border-primary transition-colors ${color}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;