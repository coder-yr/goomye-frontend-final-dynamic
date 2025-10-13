import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RefundOption } from "@/types/return";

interface RefundChoiceProps {
  selectedOption: RefundOption['type'];
  onOptionChange: (option: RefundOption['type']) => void;
}

export const RefundChoice = ({
  selectedOption,
  onOptionChange,
}: RefundChoiceProps) => {
  const refundOptions = [
    {
      type: 'voucher' as const,
      title: 'I want a Shopping Voucher',
      description: 'Receive an instant voucher that you can use for new orders.',
    },
    {
      type: 'money' as const,
      title: 'I want my money back',
      description: 'We will transfer the money to your account. This can take up to 5 days.',
    },
    {
      type: 'product' as const,
      title: 'I want another product',
      description: 'We will replace your product with a new one or one close to the one you returned',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">4. Select the money back option:</h2>
      <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="space-y-4">
        {refundOptions.map((option) => (
          <div
            key={option.type}
            className="flex items-start space-x-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            <RadioGroupItem value={option.type} id={`refund-${option.type}`} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={`refund-${option.type}`} className="cursor-pointer">
                <div className="font-semibold text-foreground">{option.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{option.description}</p>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RefundChoice;
