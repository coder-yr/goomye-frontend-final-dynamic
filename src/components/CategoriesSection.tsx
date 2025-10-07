import { Monitor, ShoppingBag, Tv, Headphones, MonitorSpeaker, Puzzle, Smile, Heart, Truck, BookOpen, Home, Camera, Clipboard, Sparkles } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    { name: "Computers", icon: Monitor, featured: false },
    { name: "Fashion", icon: ShoppingBag, featured: false },
    { name: "Electronics", icon: Tv, featured: false },
    { name: "Gaming", icon: Headphones, featured: false },
    { name: "TV/Projectors", icon: MonitorSpeaker, featured: false },
    { name: "Toys", icon: Puzzle, featured: false },
    { name: "Sport", icon: Smile, featured: true },
    { name: "Health", icon: Heart, featured: false },
    { name: "Auto", icon: Truck, featured: false },
    { name: "Books", icon: BookOpen, featured: false },
    { name: "Home", icon: Home, featured: false },
    { name: "Photo/Video", icon: Camera, featured: false },
    { name: "Collectibles", icon: Clipboard, featured: false },
    { name: "Beauty", icon: Sparkles, featured: true },
  ];

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Top categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <Icon className={`h-8 w-8 ${category.featured ? 'text-primary' : 'text-primary/70'}`} />
                </div>
                <span className={`text-sm font-medium ${category.featured ? 'text-primary' : 'text-muted-foreground'}`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
