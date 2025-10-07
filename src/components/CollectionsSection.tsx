import { Card } from "@/components/ui/card";

const CollectionsSection = () => {
  const collections = [
    {
      id: 1,
      brand: "cromā",
      subtitle: "COLLECTIONS",
      description: "In-House Exclusives",
      title: "Air Conditioners",
      price: "24,490",
      note: "*Inclusive of all Offers",
      bgClass: "bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600",
      image: "/placeholder.svg",
      alt: "Air Conditioner with remote control"
    },
    {
      id: 2,
      brand: "cromā",
      title: "Bestselling TVs",
      price: "5,590",
      note: "*Extra Exchange Benefits | Easy EMI",
      bgClass: "bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500",
      image: "/placeholder.svg",
      alt: "Family watching TV in living room"
    }
  ];

  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <Card 
              key={collection.id}
              className={`overflow-hidden border-0 ${collection.bgClass} text-white`}
            >
              <div className="p-8 md:p-12 space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-light tracking-wider">
                    {collection.brand}
                  </div>
                  {collection.subtitle && (
                    <div className="text-sm font-bold tracking-wider">
                      {collection.subtitle}
                    </div>
                  )}
                  {collection.description && (
                    <div className="text-xs tracking-wide">
                      {collection.description}
                    </div>
                  )}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  {collection.title}
                </h2>
                <div className="space-y-1">
                  <p className="text-xl">
                    Starting at <span className="text-4xl font-bold">₹{collection.price}*</span>
                  </p>
                  <p className="text-sm text-white/90">{collection.note}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
