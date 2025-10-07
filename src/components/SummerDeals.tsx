import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./ProductCard";

const SummerDeals = () => {
  const products = [
    {
      id: 1,
  image: "/air-cooler.jpg",
      title: "Croma 60 Litres Desert Air Cooler with Water Level Indicator",
      price: 7999,
      originalPrice: 14500,
      rating: 4,
      alt: "Desert Air Cooler"
    },
    {
      id: 2,
      image: "/ac.jpg",
      title: "Croma 7 in 1 Convertible 1 Ton 3 Star Inverter Split AC with Copper Condenser",
      price: 28990,
      originalPrice: 37000,
      rating: 5,
      alt: "Inverter Split AC"
    },
    {
      id: 3,
      image: "/ac-2.jpg",
      title: "Croma 7 in 1 Convertible 1.5 Ton 3 Star Inverter Split AC with Copper Condenser",
      price: 30990,
      originalPrice: 42000,
      rating: 5,
      alt: "1.5 Ton Split AC"
    },
    {
      id: 4,
      image: "/air-cooler-2.jpg",
      title: "Croma 40 Litres Personal Air Cooler with Inverter Compatible",
      price: 5999,
      originalPrice: 11500,
      rating: 4,
      alt: "Personal Air Cooler"
    },
    {
      id: 5,
      image: "/air-cooler-3.jpg",
      title: "Croma 60 Litres Desert Air Cooler with Water Level Indicator",
      price: 7999,
      originalPrice: 14500,
      rating: 4,
      alt: "Desert Air Cooler"
    }
  ];

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

export default SummerDeals;
