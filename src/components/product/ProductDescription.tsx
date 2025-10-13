import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api";

const ProductDescription = ({ productId }: { productId: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    async function fetchDescription() {
      try {
        const product = await getProduct(productId);
        setDescription(product.description);
      } catch (error) {
        console.error("Failed to fetch product description", error);
      }
    }
    fetchDescription();
  }, [productId]);

  return (
    <div className="text-foreground space-y-4">
        <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />

      <Button
        variant="link"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary p-0 h-auto font-normal hover:no-underline"
      >
        Show {isExpanded ? "less" : "more"}
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1" />
        )}
      </Button>
    </div>
  );
};

export default ProductDescription;