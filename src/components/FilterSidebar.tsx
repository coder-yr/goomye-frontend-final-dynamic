import { useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterSection {
  title: string;
  items: string[];
  type?: 'checkbox' | 'text';
}

const filterSections: FilterSection[] = [
  {
    title: "Categories",
    items: [
      "TV, Audio-Video",
      "Desktop PC",
      "Gaming",
      "Monitors",
      "Laptops",
      "Console",
      "Tablets",
      "Foto",
      "Fashion",
      "Books"
    ]
  }
];

const additionalFilters = [
  "Rating",
  "Price",
  "Shipping to",
  "Color",
  "Delivery Method",
  "Condition",
  "Weight"
];

export const FilterSidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Desktop PC", "Laptops", "Tablets"]);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFilter = (filter: string) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="w-64 border-r bg-background p-4 space-y-4">
      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-sm mb-3">
          Categories
          {categoriesOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for categories"
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            {filterSections[0].items.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm cursor-pointer select-none"
                >
                  {category}
                </label>
              </div>
            ))}
            <button className="text-primary text-sm font-medium flex items-center gap-1 mt-2">
              See more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {additionalFilters.map((filter) => (
        <Collapsible
          key={filter}
          open={openFilters[filter]}
          onOpenChange={() => toggleFilter(filter)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-sm py-2 border-t">
            {filter}
            {openFilters[filter] ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="text-sm text-muted-foreground">
              Filter options for {filter}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
