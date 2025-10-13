import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts("featured=true&limit=8")
      .then((res) => {
        if (res && res.products && res.products.length) {
          setProducts(res.products.map((p: any) => ({
            id: p.id,
            image: p.images && p.images.length ? p.images[0] : "/placeholder.svg",
            title: p.name,
            price: p.price,
            originalPrice: p.originalPrice || p.price * 1.2,
            rating: p.rating || 4,
            alt: p.name,
            category: p.category,
            brand: p.brand
          })));
        }
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Handpicked premium products just for you</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-lg bg-muted animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;