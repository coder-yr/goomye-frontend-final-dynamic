import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/return";
import { ReturnCondition, ReturnReason as ReturnReasonType } from "@/types/return";

interface ReturnReasonProps {
  selectedProduct: Product;
  condition: keyof ReturnCondition;
  reasons: (keyof ReturnReasonType)[];
  onConditionChange: (condition: keyof ReturnCondition) => void;
  onReasonToggle: (reason: keyof ReturnReasonType) => void;
}

export const ReturnReason = ({
  selectedProduct,
  condition,
  reasons,
  onConditionChange,
  onReasonToggle,
}: ReturnReasonProps) => {
  const conditionOptions = [
    { value: "sealed" as const, label: "I want to return a sealed product" },
    { value: "mistaken" as const, label: "I want to return an mistaken order" },
    { value: "functionalUnsealed" as const, label: "I want to return a functional but unsealed product" },
    { value: "nonFunctionalUnsealed" as const, label: "I want to return a non-functional but unsealed product" },
    { value: "notDelivered" as const, label: "The product was not delivered" },
  ];

  const reasonOptions = [
    { value: "defective" as const, label: "Defective or Damaged Product" },
    { value: "incorrect" as const, label: "Incorrect Product Received" },
    { value: "unsatisfactory" as const, label: "Unsatisfactory Quality" },
    { value: "changedMind" as const, label: "Changed Mind/Not as Expected" },
    { value: "misleading" as const, label: "Misleading Product Information" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">2. Select the reason for returning:</h2>
      <p className="text-muted-foreground mb-6">
        To help us solve your request as quickly as possible, please answer the following questions.
      </p>

      <div className="flex items-start gap-4 p-5 mb-6 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl border border-border/50">
        <div className="w-20 h-20 bg-card rounded-lg flex-shrink-0 flex items-center justify-center p-2 overflow-hidden shadow-sm">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground leading-snug">{selectedProduct.name}</p>
        </div>
        <div className="text-sm text-muted-foreground text-right space-y-1 flex-shrink-0">
          <div>
            <span className="inline-block w-28">Order Number:</span>
            <span className="font-semibold text-foreground">{selectedProduct.orderNumber}</span>
          </div>
          <div>
            <span className="inline-block w-28">Return Term:</span>
            <span className="font-semibold text-foreground">{selectedProduct.returnTerm}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-5 text-foreground">What is the condition of the product?</h3>
          <RadioGroup value={condition} onValueChange={onConditionChange}>
            {conditionOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 mb-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={option.value} id={`condition-${option.value}`} />
                <Label htmlFor={`condition-${option.value}`} className="cursor-pointer font-normal text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button variant="outline" className="mt-5 w-full hover:bg-secondary transition-colors">
            Other condition
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-5 text-foreground">What is the main reason for returning the product?</h3>
          <div className="space-y-3">
            {reasonOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <Checkbox
                  checked={reasons.includes(option.value)}
                  onCheckedChange={() => onReasonToggle(option.value)}
                  id={`reason-${option.value}`}
                />
                <Label htmlFor={`reason-${option.value}`} className="cursor-pointer font-normal text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-5 w-full hover:bg-secondary transition-colors">
            I have another reason
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl">
        <p className="text-sm text-accent leading-relaxed">
          Kindly select your reasons for returning the product thoughtfully, as this will aid us in expediting your request resolution and ensuring your utmost satisfaction with the overall purchase experience.
        </p>
      </div>
    </div>
  );
};

export default ReturnReason;
