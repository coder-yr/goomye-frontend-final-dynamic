import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

const QuantitySelector = ({ quantity, onChange, disabled = false }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2 border border-border rounded-md w-fit">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none hover:bg-muted"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2rem] text-center text-sm">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none hover:bg-muted"
        onClick={() => onChange(quantity + 1)}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
