import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  completed: boolean;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator = ({ steps }: StepIndicatorProps) => {
  return (
    <div className="bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-xl p-6 mb-8 border border-border/50">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-all duration-300",
                    step.completed ? "bg-[hsl(var(--step-complete))]" : "bg-border"
                  )}
                />
              )}
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                  step.completed
                    ? "bg-[hsl(var(--step-complete))] border-[hsl(var(--step-complete))] text-white scale-110"
                    : step.active
                    ? "border-[hsl(var(--step-active))] bg-card text-[hsl(var(--step-active))] scale-110"
                    : "border-[hsl(var(--step-inactive))] bg-card/50 text-[hsl(var(--step-inactive))]"
                )}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-all duration-300",
                    steps[index + 1].completed ? "bg-[hsl(var(--step-complete))]" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium mt-3 text-center transition-colors duration-300",
                step.completed || step.active
                  ? "text-[hsl(var(--step-active))]"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
