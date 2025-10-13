import { ChevronRight } from "lucide-react";

const steps = ["Checkout", "Review and Pay", "Order confirmation"];

interface CheckoutBreadcrumbProps {
  currentStep?: number;
}

const CheckoutBreadcrumb = ({ currentStep = 0 }: CheckoutBreadcrumbProps) => {
  return (
    <div className="flex items-center justify-center gap-2 py-6 border-b border-border">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className={`text-sm ${
              index === currentStep
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutBreadcrumb;
