
import { useState } from "react";
import {
  Monitor,
  Shirt,
  Lightbulb,
  Gamepad2,
  Tv,
  Gift,
  Bike,
  ShoppingBag,
  Heart,
  Car,
  BookOpen,
  Wind,
  Camera,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubCategory {
  title: string;
  items: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  subCategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: "computer",
    name: "Computer & Office",
    icon: Monitor,
    subCategories: [
      {
        title: "Laptops",
        items: ["Gaming", "2 in 1", "Business", "Home Office", "Ultrabook"],
      },
      {
        title: "Monitors",
        items: ["Build-In Speakers", "TV & Home Cinema", "Audio & HiFi", "Headphones", "Home Cinema"],
      },
      {
        title: "Desktop PC",
        items: ["Gaming PC", "Home Office", "Servers", "Mini PC", "All in One PC"],
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion/Clothes",
    icon: Shirt,
    subCategories: [
      {
        title: "Men's Fashion",
        items: ["Shirts", "T-Shirts", "Jeans", "Jackets", "Shoes"],
      },
      {
        title: "Women's Fashion",
        items: ["Dresses", "Tops", "Jeans", "Shoes", "Accessories"],
      },
      {
        title: "Kids Fashion",
        items: ["Boys", "Girls", "Baby", "Shoes", "Accessories"],
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Lightbulb,
    subCategories: [
      {
        title: "Tablets",
        items: ["Best Sellers", "Phone Call Functionality", "Supports USB OTG", "iOS", "Android"],
      },
      {
        title: "Memory & Storage",
        items: ["Primary Storage Devices", "Magnetic Storage Devices", "Flash Memory Devices", "Optical Storage Devices"],
      },
      {
        title: "Printers & Ink",
        items: ["Best Sellers", "Laser Printers", "Inkjet Printers"],
      },
    ],
  },
  {
    id: "gaming",
    name: "Gaming/Consoles",
    icon: Gamepad2,
    subCategories: [
      {
        title: "Consoles",
        items: ["PlayStation 5", "Xbox Series X", "Nintendo Switch", "Retro Gaming", "Accessories"],
      },
      {
        title: "Gaming Accessories",
        items: ["Controllers", "Headsets", "Gaming Chairs", "Keyboards", "Mice"],
      },
      {
        title: "Games",
        items: ["New Releases", "Best Sellers", "Pre-Orders", "Digital Downloads"],
      },
    ],
  },
  {
    id: "tv",
    name: "TV/Projectors",
    icon: Tv,
    subCategories: [
      {
        title: "Televisions",
        items: ["Smart TV", "4K TV", "8K TV", "OLED", "QLED"],
      },
      {
        title: "Projectors",
        items: ["Home Theater", "Portable", "4K Projectors", "Gaming Projectors"],
      },
      {
        title: "Accessories",
        items: ["Wall Mounts", "Cables", "Remote Controls", "Sound Bars"],
      },
    ],
  },
  {
    id: "collectibles",
    name: "Collectibles & Toys",
    icon: Gift,
    subCategories: [
      {
        title: "Action Figures",
        items: ["Marvel", "DC Comics", "Star Wars", "Anime", "Limited Edition"],
      },
      {
        title: "Board Games",
        items: ["Strategy", "Family Games", "Card Games", "Puzzles"],
      },
      {
        title: "Collectibles",
        items: ["Trading Cards", "Statues", "Memorabilia", "Vintage Toys"],
      },
    ],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: Bike,
    subCategories: [
      {
        title: "Fitness Equipment",
        items: ["Treadmills", "Exercise Bikes", "Weights", "Yoga Mats"],
      },
      {
        title: "Outdoor Gear",
        items: ["Camping", "Hiking", "Cycling", "Water Sports"],
      },
      {
        title: "Sports Wear",
        items: ["Running Shoes", "Athletic Wear", "Sports Accessories"],
      },
    ],
  },
  {
    id: "food",
    name: "Food & Grocery",
    icon: ShoppingBag,
    subCategories: [
      {
        title: "Fresh Produce",
        items: ["Fruits", "Vegetables", "Organic", "Herbs"],
      },
      {
        title: "Pantry",
        items: ["Snacks", "Beverages", "Canned Goods", "Pasta & Rice"],
      },
      {
        title: "Frozen Foods",
        items: ["Ice Cream", "Frozen Meals", "Vegetables", "Meat"],
      },
    ],
  },
  {
    id: "health",
    name: "Health & Beauty",
    icon: Heart,
    subCategories: [
      {
        title: "Skincare",
        items: ["Moisturizers", "Cleansers", "Serums", "Face Masks"],
      },
      {
        title: "Makeup",
        items: ["Foundations", "Lipsticks", "Eye Shadow", "Brushes"],
      },
      {
        title: "Health",
        items: ["Vitamins", "Supplements", "First Aid", "Personal Care"],
      },
    ],
  },
  {
    id: "car",
    name: "Car & Motorbike",
    icon: Car,
    subCategories: [
      {
        title: "Car Accessories",
        items: ["Car Audio", "GPS", "Dash Cams", "Phone Holders"],
      },
      {
        title: "Car Care",
        items: ["Cleaning", "Tools", "Maintenance", "Oils & Fluids"],
      },
      {
        title: "Motorbike",
        items: ["Helmets", "Jackets", "Gloves", "Parts"],
      },
    ],
  },
  {
    id: "books",
    name: "Books",
    icon: BookOpen,
    subCategories: [
      {
        title: "Fiction",
        items: ["Bestsellers", "Mystery", "Romance", "Sci-Fi", "Fantasy"],
      },
      {
        title: "Non-Fiction",
        items: ["Biography", "Self-Help", "Business", "History"],
      },
      {
        title: "Educational",
        items: ["Textbooks", "Study Guides", "Children's Books"],
      },
    ],
  },
  {
    id: "air-quality",
    name: "Home Air Quality",
    icon: Wind,
    subCategories: [
      {
        title: "Air Purifiers",
        items: ["HEPA Filters", "Smart Purifiers", "Portable", "Large Room"],
      },
      {
        title: "Humidifiers",
        items: ["Cool Mist", "Warm Mist", "Ultrasonic", "Evaporative"],
      },
      {
        title: "Air Conditioners",
        items: ["Window Units", "Portable", "Split Systems", "Central AC"],
      },
    ],
  },
  {
    id: "photo",
    name: "Photo/Video",
    icon: Camera,
    subCategories: [
      {
        title: "Cameras",
        items: ["DSLR", "Mirrorless", "Action Cameras", "Point & Shoot"],
      },
      {
        title: "Lenses",
        items: ["Prime", "Zoom", "Wide Angle", "Telephoto"],
      },
      {
        title: "Accessories",
        items: ["Tripods", "Memory Cards", "Bags", "Lighting"],
      },
    ],
  },
];


const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Show dropdown if hovering button or dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => {
        setDropdownVisible(false);
        setActiveCategory(null);
      }}
    >
      <button
        className="h-full px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
        type="button"
        aria-haspopup="true"
        aria-expanded={dropdownVisible}
      >
        Categories
        <ChevronRight className="h-4 w-4 rotate-90" />
      </button>

      {/* Mega Menu Dropdown */}
      {dropdownVisible && (
        <div className="absolute left-0 top-full pt-2 z-50 min-w-[400px]">
          <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
            <div className="flex">
              {/* Categories Sidebar */}
              <div className="w-64 bg-muted/30 border-r border-border">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-3 text-left text-sm transition-colors",
                        activeCategory === category.id
                          ? "bg-background text-primary font-medium"
                          : "hover:bg-background/50"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1">{category.name}</span>
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Subcategories Content */}
              <div className="w-[800px] p-6 bg-background">
                {activeCategory && (
                  <div className="grid grid-cols-3 gap-8">
                    {categories
                      .find((cat) => cat.id === activeCategory)
                      ?.subCategories.map((subCat) => (
                        <div key={subCat.title}>
                          <h3 className="font-semibold text-sm mb-3 text-foreground">
                            {subCat.title}
                          </h3>
                          <ul className="space-y-2">
                            {subCat.items.map((item) => (
                              <li key={item}>
                                <a
                                  href="#"
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    {/* Additional Column - Computer Components */}
                    {activeCategory === "computer" && (
                      <div>
                        <h3 className="font-semibold text-sm mb-3 text-foreground">
                          Computer Components
                        </h3>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Graphics Cards</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Memory</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Motherboards</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Power Supplies</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">CPUs</a></li>
                        </ul>
                        <h3 className="font-semibold text-sm mb-3 mt-4 text-foreground">
                          Software
                        </h3>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Operating Systems</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Antivirus & Security</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Programming</a></li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {!activeCategory && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm">Hover over a category to view options</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
