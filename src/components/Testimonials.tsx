import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=32",
    content: "The products I've purchased from this store have exceeded my expectations. Fast shipping and excellent customer service!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "https://i.pravatar.cc/150?img=53",
    content: "As someone who relies on quality tech gear, I'm impressed with the selection and competitive pricing. Will definitely shop here again.",
    rating: 4
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Creator",
    avatar: "https://i.pravatar.cc/150?img=47",
    content: "The customer support team went above and beyond to help me find the perfect laptop for my content creation needs.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Gaming Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=12",
    content: "The gaming setup I purchased was delivered promptly and works flawlessly. Couldn't be happier with my experience!",
    rating: 5
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?img=25",
    content: "Found the perfect budget-friendly laptop for my studies. The website made comparing options so easy!",
    rating: 4
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers are saying about their shopping experience.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: isMobile ? 1 : 2,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem 
                key={testimonial.id} 
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm flex-grow">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex items-center justify-center mt-8">
            <CarouselPrevious className="relative static mx-2" />
            <CarouselNext className="relative static mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;