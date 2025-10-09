import { Card } from "@/components/ui/card";

interface ProductOptionsProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedStorage: string;
  setSelectedStorage: (storage: string) => void;
}

const ProductOptions = ({
  selectedColor,
  setSelectedColor,
  selectedStorage,
  setSelectedStorage,
}: ProductOptionsProps) => {
  const colors = [
    { name: "Green", class: "bg-green-500" },
    { name: "Pink", class: "bg-pink-400" },
    { name: "Silver", class: "bg-gray-300" },
    { name: "Blue", class: "bg-blue-500" },
  ];

  const storageOptions = ["256GB", "512GB", "1TB"];

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="font-semibold mb-3">Colour</h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                selectedColor === color.name
                  ? 'border-primary bg-primary/5 font-medium'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* SSD Capacity */}
      <div>
        <h3 className="font-semibold mb-3">SSD capacity</h3>
        <div className="flex gap-3">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => setSelectedStorage(storage)}
              className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                selectedStorage === storage
                  ? 'border-primary bg-primary/5 font-medium'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      {/* Pickup Options */}
      <div>
        <h3 className="font-semibold mb-3">Pickup</h3>
        <Card className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <input type="radio" name="pickup" id="shipping" defaultChecked className="mt-1" />
            <label htmlFor="shipping" className="flex-1">
              <div className="font-medium">Shipping - $19</div>
              <div className="text-sm text-muted-foreground">Arrives Feb. 12</div>
            </label>
          </div>
          <div className="flex items-start gap-3">
            <input type="radio" name="pickup" id="pickup-free" className="mt-1" />
            <label htmlFor="pickup-free" className="flex-1">
              <div className="font-medium">Pickup from Goomneys - $9</div>
              <div className="text-sm text-primary">Pick a Goomneys near you</div>
            </label>
          </div>
          <div className="flex items-start gap-3">
            <input type="radio" name="pickup" id="pickup-store" className="mt-1" />
            <label htmlFor="pickup-store" className="flex-1">
              <div className="font-medium">Pickup from our store</div>
              <div className="text-sm text-muted-foreground">Not available</div>
            </label>
          </div>
        </Card>
      </div>

      {/* Warranty Options */}
      <div>
        <h3 className="font-semibold mb-3">Add extra warranty</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg text-sm hover:border-primary/50">
            1 year - $39
          </button>
          <button className="px-4 py-2 border border-border rounded-lg text-sm hover:border-primary/50">
            2 years - $69
          </button>
          <button className="px-4 py-2 border border-border rounded-lg text-sm hover:border-primary/50">
            3 years - $991
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;