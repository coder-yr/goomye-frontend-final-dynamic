import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  name: string;
  price: string;
  salePrice?: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

const ProductItem = ({ name, price, salePrice, color, size, quantity, image, productId }: ProductItemProps & { productId?: number }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 p-4 border-b last:border-b-0">
      <div className="w-28 h-28 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{name}</h4>
        <div className="flex items-center gap-2 mb-4">
          {salePrice ? (
            <>
              <span className="text-muted-foreground line-through text-sm">{price}</span>
              <span className="text-destructive font-medium">{salePrice}</span>
            </>
          ) : (
            <span className="font-medium">{price}</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-8 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Color</p>
            <p>{color}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Size</p>
            <p>{size}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Quantity</p>
            <p>{quantity}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Buy it again</Button>
          <Button variant="outline" size="sm" onClick={() => productId && navigate(`/products/${productId}`)}>Write a product review</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
