import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import hero1 from "@/assets/hero-1.jpg";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const staticSlides = [
  { id: 1, image: hero1, alt: "Fashion collection hero image" },
  { id: 2, image: hero1, alt: "Fashion collection hero image" },
  { id: 3, image: hero1, alt: "Fashion collection hero image" },
];

const HeroCarousel: React.FC = () => {
  const [slides, setSlides] = useState(staticSlides);

  useEffect(() => {
    api.getCarousel()
      .then((res) => {
        if (res && res.carousel && res.carousel.length) {
          setSlides(res.carousel.map((s: any, idx: number) => ({ id: s.id ?? idx, image: s.image ?? "/hero-1.jpg", alt: s.alt })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full aspect-[3/1] bg-muted">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
