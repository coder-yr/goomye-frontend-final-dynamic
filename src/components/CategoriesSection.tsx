

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Monitor,
  ShoppingBag,
  Tv,
  Gamepad2,
  BadgePercent,
  ToyBrick,
  Heart,
  Truck,
  BookOpen,
  Home,
  Camera,
  Clipboard,
  Sparkles,
  Smile,
  Eye,
  Smartphone
} from "lucide-react";

const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    api.getCategories()
      .then((res) => {
        console.log('Categories API response:', res);
        // Try to handle both array and object with categories property
        if (Array.isArray(res)) {
          setCategories(res);
        } else if (res && Array.isArray(res.categories)) {
          setCategories(res.categories);
        }
      })
      .catch((err) => {
        console.error('Categories API error:', err);
      });
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    "Computers": Monitor,
    "Fashion": ShoppingBag,
    "Electronics": Tv,
    "Gaming": Gamepad2,
    "TV/Projectors": Tv,
    "Toys": ToyBrick,
    "Sport": Smile,
    "Health": Heart,
    "Auto": Truck,
    "Books": BookOpen,
    "Home": Home,
    "Photo/Video": Camera,
    "Collectibles": Clipboard,
    "Beauty": Sparkles
  };

  const allowedCategories = Object.keys(iconMap);

  const filteredCategories = categories.filter(cat =>
    allowedCategories.includes(cat.name)
  );

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Top categories</h2>
        {filteredCategories.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No categories available.</div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
            {filteredCategories.map((category, idx) => (
              <button
                key={category.id ?? category.name ?? idx}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  {iconMap[category.name] ? (
                    React.createElement(iconMap[category.name], { className: "h-8 w-8 text-primary" })
                  ) : (
                    <span className="h-8 w-8 bg-muted rounded-full" />
                  )}
                </div>
                <span className={`text-sm font-medium ${category.featured ? 'text-primary' : 'text-muted-foreground'}`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
