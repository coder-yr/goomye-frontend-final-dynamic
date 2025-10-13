import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DeliveryMethod } from "@/types/return";

interface DeliveryOptionProps {
  selectedMethod: DeliveryMethod['type'];
  onMethodChange: (method: DeliveryMethod['type']) => void;
}

export const DeliveryOption = ({
  selectedMethod,
  onMethodChange,
}: DeliveryOptionProps) => {
  const deliveryOptions = [
    {
      type: 'express' as const,
      title: 'Express courier - $19',
      description: 'Send it by Tomorrow',
      logos: ['fedex', 'ups']
    },
    {
      type: 'store' as const,
      title: 'Store pickup - Free',
      description: 'Send it by Today',
    },
    {
      type: 'flowbox' as const,
      title: 'Flowbox - $29',
      description: 'Send it by 2 Jan 2024',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">3. Select the method of delivery of the product:</h2>
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="space-y-4">
        {deliveryOptions.map((option) => (
          <div
            key={option.type}
            className="flex items-center space-x-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            <RadioGroupItem value={option.type} id={`delivery-${option.type}`} />
            <div className="flex-1">
              <Label htmlFor={`delivery-${option.type}`} className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">{option.title}</span>
                  {option.logos && (
                    <div className="flex gap-2">
                      {option.logos.map((logo) => (
                        <div key={logo} className="px-3 py-1 bg-gradient-to-r from-muted to-secondary rounded-md flex items-center justify-center text-xs font-medium uppercase">
                          {logo}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{option.description}</p>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-6 p-5 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl">
        <p className="text-sm text-accent leading-relaxed">
          If you choose to send the product through the Flowbox automatic pick-up service, make sure that the package fits in the drawer.
        </p>
      </div>
    </div>
  );
};

export default DeliveryOption;
