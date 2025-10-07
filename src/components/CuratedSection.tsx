import { Package, Truck, Tv, Tag, Percent, Crown } from "lucide-react";

const CuratedSection = () => {
  const categories = [
    { id: 1, icon: Package, label: "Bundles" },
    { id: 2, icon: Truck, label: "Fast Delivery" },
    { id: 3, icon: Tv, label: "Electronics" },
    { id: 4, icon: Tag, label: "Best Deals" },
    { id: 5, icon: Percent, label: "Discounts" },
    { id: 6, icon: Crown, label: "Premium" }
  ];

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Exclusively Curated For You</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="flex flex-col items-center justify-center w-20 h-20 bg-gray-900 hover:bg-gray-800 rounded-2xl transition-colors duration-300"
                aria-label={category.label}
              >
                <Icon className="h-8 w-8 text-white" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedSection;
