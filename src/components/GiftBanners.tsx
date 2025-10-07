import { Card } from "@/components/ui/card";

const GiftBanners = () => {
  const banners = [
    {
      id: 1,
      title: "The Cromā E-Gift Card",
      description: "is a personalised gift of choice for you to give to your loved ones",
      bgClass: "bg-gradient-to-br from-purple-900 via-purple-800 to-gray-700",
      image: "/placeholder.svg",
      alt: "Croma E-Gift Card"
    },
    {
      id: 2,
      brand: "cromā",
      title: "INDULGE",
      description: "Splurge on premium appliances for luxurious experiences.",
      bgClass: "bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900",
      image: "/placeholder.svg",
      alt: "Premium appliances"
    }
  ];

  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <Card 
              key={banner.id}
              className={`overflow-hidden border-0 ${banner.bgClass} text-white hover:shadow-2xl transition-shadow duration-300`}
            >
              <div className="grid md:grid-cols-2 items-center min-h-[300px]">
                <div className="p-8 space-y-4">
                  {banner.brand && (
                    <div className="text-xl font-light tracking-wider mb-2">
                      {banner.brand}
                    </div>
                  )}
                  <h3 className="text-3xl font-bold">
                    {banner.title}
                  </h3>
                  <p className="text-lg text-white/90">
                    {banner.description}
                  </p>
                </div>
                <div className="h-full hidden md:flex items-center justify-center p-4">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftBanners;
