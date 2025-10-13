import { Check } from "lucide-react";

interface ProgressStep {
  label: string;
  status: "completed" | "active" | "pending";
}

const ProgressTracker = () => {
  const steps: ProgressStep[] = [
    { label: "Order placed", status: "completed" },
    { label: "Preparing order", status: "active" },
    { label: "Shipped", status: "pending" },
    { label: "Delivered", status: "pending" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-start flex-1">
            <div className="flex items-center gap-2 mb-2">
              {step.status === "completed" && <Check className="w-4 h-4" />}
              {step.status === "active" && (
                <span className="w-2 h-2 rounded-full bg-success" />
              )}
              <span
                className={`text-sm ${
                  step.status === "pending" ? "text-muted-foreground" : ""
                } ${step.status === "active" ? "text-success font-medium" : ""}`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-1 flex-1 bg-primary rounded" />
        <div className="h-1 flex-1 bg-success rounded" />
        <div className="h-1 flex-1 bg-muted rounded" />
        <div className="h-1 flex-1 bg-muted rounded" />
      </div>
    </div>
  );
};

export default ProgressTracker;
