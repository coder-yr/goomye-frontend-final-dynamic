import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import api from "@/lib/api";

const staticProducts = [
  {
    id: 1,
    image: product1,
    title: "SONY HT-S20R 400W Bluetooth Home Theatre System",
    price: 15990,
    originalPrice: 19900,
    rating: 5,
    alt: "SONY Home Theatre System"
  },
  {
    id: 2,
    image: product2,
    title: "Lenovo LOQ 15IRX9 Intel Core i7 14th Gen Gaming Laptop",
    price: 125990,
    originalPrice: 177490,
    rating: 3,
    alt: "Lenovo Gaming Laptop"
  },
  {
    id: 3,
    image: product3,
    title: "Croma Velocity AR Smartwatch with Bluetooth Calling",
    price: 2399,
    originalPrice: 3200,
    rating: 3,
    alt: "Croma Smartwatch"
  },
  {
    id: 4,
    image: product4,
    title: "LG 8 kg 5 Star Inverter Fully Automatic Top Load Washing Machine",
    price: 24990,
    originalPrice: 31490,
    rating: 5,
    alt: "LG Washing Machine"
  },
  {
    id: 5,
    image: product1,
    title: "SONY HT-S20R 400W Bluetooth Home Theatre System",
    price: 15990,
    originalPrice: 19900,
    rating: 5,
    alt: "SONY Home Theatre System"
  }
];

const TrendingDeals = () => {
  const [products, setProducts] = useState<typeof staticProducts>(staticProducts);

  useEffect(() => {
    let mounted = true;

    api.getDeals()
      .then((res) => {
        // Expecting res.deals or an array
        const data = res && (res.deals ?? res) ;
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          // Map backend deal objects to the ProductCard props shape if needed
          const mapped = data.map((d: any, idx: number) => ({
            id: d.id ?? `deal-${idx}`,
            image: d.image ?? staticProducts[idx % staticProducts.length].image,
            title: d.title ?? d.name ?? staticProducts[idx % staticProducts.length].title,
            price: d.price ?? d.dealPrice ?? staticProducts[idx % staticProducts.length].price,
            originalPrice: d.originalPrice ?? d.mrp ?? staticProducts[idx % staticProducts.length].originalPrice,
            rating: d.rating ?? 4,
            alt: d.alt ?? d.title ?? "Deal product",
          }));
          setProducts(mapped as any);
        }
      })
      .catch(() => {
        // keep static products on error
      });

    return () => { mounted = false; };
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Trending New Deals Everyday</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <ProductCard {...product} />
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

export default TrendingDeals;
