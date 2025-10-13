import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSafeImageUrl } from "@/lib/imageUtils";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGallery = ({ images = [] }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  // Ensure we have at least one image
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];
  
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex gap-6">
      {/* Thumbnails vertical */}
      <div className="flex flex-col gap-3">
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`border rounded-lg overflow-hidden transition-all w-16 h-16 aspect-square flex items-center justify-center bg-white ${
              selectedImage === idx
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {!imagesLoaded[idx] && <Skeleton className="w-full h-full" />}
            <img
              src={getSafeImageUrl(img)}
              alt={`Thumbnail ${idx + 1}`}
              className={`w-full h-full object-contain ${imagesLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(idx)}
              onError={() => handleImageLoad(idx)}
            />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="flex-1 aspect-square bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center p-4">
        {!imagesLoaded[selectedImage] && <Skeleton className="w-full h-full" />}
        <img
          src={getSafeImageUrl(safeImages[selectedImage])}
          alt="Product"
          className={`w-full h-full object-contain ${imagesLoaded[selectedImage] ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => handleImageLoad(selectedImage)}
          onError={() => handleImageLoad(selectedImage)}
        />
      </div>
    </div>
  );
};

export default ProductGallery;