import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductGallery = ({ images = [] }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex gap-6">
      {/* Thumbnails vertical */}
      <div className="flex flex-col gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`border rounded-lg overflow-hidden transition-all w-16 h-16 aspect-square flex items-center justify-center bg-white ${
              selectedImage === idx
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="flex-1 aspect-square bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center p-4">
        <img
          src={images[selectedImage]}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;