import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import imac from "@/assets/imac.jpg";
import gamingController from "@/assets/gaming-controller.jpg";
import peripherals from "@/assets/peripherals.jpg";
import tablet from "@/assets/tablet.jpg";
import smartphone from "@/assets/smartphone.jpg";
import console from "@/assets/console.jpg";
import smartwatch from "@/assets/smartwatch.jpg";
import tabletGuide from "@/assets/tablet-guide.jpg";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Enhance your study habits with iMac",
      image: imac,
      hasButton: false,
      alt: "iMac desktop computer"
    },
    {
      id: 2,
      title: "Mind-blowing savings on gaming",
      image: gamingController,
      hasButton: false,
      alt: "Gaming controller"
    },
    {
      id: 3,
      title: "Computer Peripherals for your upgrade",
      image: peripherals,
      hasButton: false,
      alt: "Keyboard and mouse"
    },
    {
      id: 4,
      title: "Discover the best Echo devices",
      image: tablet,
      hasButton: false,
      alt: "Echo tablet device"
    },
    {
      id: 5,
      title: "Trending gadgets to make it feel like home",
      image: smartphone,
      hasButton: true,
      buttonText: "See more gaming",
      alt: "Smartphone"
    },
    {
      id: 6,
      title: "Browse our Consoles range for best deals",
      image: console,
      hasButton: true,
      buttonText: "Shop gadgets",
      alt: "Gaming console"
    },
    {
      id: 7,
      title: "Watches you've never seen before",
      image: smartwatch,
      hasButton: true,
      buttonText: "See more watches",
      alt: "Smartwatch"
    },
    {
      id: 8,
      title: "Your guide to the top tablets on the market",
      image: tabletGuide,
      hasButton: true,
      buttonText: "See tablets deals",
      alt: "Tablet device"
    }
  ];

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card"
            >
              <div className="p-6 space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold leading-tight min-h-[56px]">
                  {category.title}
                </h3>
                {category.hasButton && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    {category.buttonText}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
