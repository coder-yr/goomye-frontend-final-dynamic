import { useEffect, useState } from "react";
import { getProduct } from "@/lib/api";

const ProductSpecs = ({ productId }: { productId: string }) => {
  const [specs, setSpecs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSpecs() {
      try {
        const product = await getProduct(productId);
        // Expect product.productDetails to be an array of spec sections
        setSpecs(product.productDetails || []);
      } catch (error) {
        setSpecs([]);
      }
    }
    fetchSpecs();
  }, [productId]);

  return (
    <>
      {specs.map((section: any, idx: number) => (
        <div key={idx} className="border border-border rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item: any, itemIdx: number) => (
              <div key={itemIdx} className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSpecs;