import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getCarousel } from "@/lib/api";

const HeroCarousel: React.FC = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCarousel()
      .then((res) => {
        if (res && res.carousel && res.carousel.length) {
          setSlides(res.carousel.map((s: any, idx: number) => ({ 
            id: s.id ?? idx, 
            image: "/banner.png", 
            alt: s.alt,
            title: s.title || "Discover the Latest Tech",
            subtitle: s.subtitle || "Exclusive deals on premium products",
            ctaText: s.ctaText || "Shop Now",
            ctaLink: s.ctaLink || "/products"
          })));
        }
      })
      .catch((error) => {
        console.error("Error fetching carousel data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full">
      <Carousel className="w-full" opts={{ loop: true, autoplay: true }}>
        <CarouselContent>
          {loading ? (
            <CarouselItem>
              <div className="relative w-full aspect-[3/1] bg-muted animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </CarouselItem>
          ) : slides.length > 0 ? (
            slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative w-full aspect-[3/1] bg-muted overflow-hidden group">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-12 md:px-24">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 max-w-md">{slide.title}</h2>
                    <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-8 max-w-md">{slide.subtitle}</p>
                    <div>
                      <Button asChild size="lg" className="group/btn">
                        <a href={slide.ctaLink}>
                          {slide.ctaText}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="relative w-full aspect-[3/1] bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">No carousel items available</p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-70 hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-4 opacity-70 hover:opacity-100 transition-opacity" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
