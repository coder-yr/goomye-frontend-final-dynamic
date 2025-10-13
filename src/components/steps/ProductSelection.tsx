import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/return";

interface ProductSelectionProps {
  products: Product[];
  selectedProducts: string[];
  onToggleProduct: (productId: string) => void;
}

export const ProductSelection = ({
  products,
  selectedProducts,
  onToggleProduct,
}: ProductSelectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">1. Select the product you want to return:</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group"
            onClick={() => onToggleProduct(product.id)}
          >
            <Checkbox
              checked={selectedProducts.includes(product.id)}
              onCheckedChange={() => onToggleProduct(product.id)}
              className="mt-1"
            />
            <div className="w-20 h-20 bg-gradient-to-br from-muted to-secondary rounded-lg flex-shrink-0 flex items-center justify-center p-2 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                {product.name}
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-right space-y-1 flex-shrink-0">
              <div>
                <span className="inline-block w-28">Order Number:</span>
                <span className="font-semibold text-foreground">{product.orderNumber}</span>
              </div>
              <div>
                <span className="inline-block w-28">Return Term:</span>
                <span className="font-semibold text-foreground">{product.returnTerm}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelection;
