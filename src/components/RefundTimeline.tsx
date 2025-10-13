import { Check, Package, Truck, MapPin, DollarSign, ShoppingBag } from "lucide-react";

interface TimelineStep {
  icon: React.ReactNode;
  title: string;
  date?: string;
  description?: string;
  status: "completed" | "current" | "pending";
}

interface RefundTimelineProps {
  steps: TimelineStep[];
}

const RefundTimeline = ({ steps }: RefundTimelineProps) => {
  return (
    <div className="space-y-1">
      {steps.map((step, index) => (
        <div key={index} className="relative pb-10 last:pb-0">
          {index !== steps.length - 1 && (
            <div className="absolute left-[18px] top-10 h-full w-0.5 bg-border" />
          )}
          <div className="flex gap-4">
            <div
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                step.status === "completed"
                  ? "border-success bg-success text-success-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {step.icon}
            </div>
            <div className="flex-1 pt-0.5">
              <h3 className="font-semibold text-foreground text-[15px]">{step.title}</h3>
              {step.date && (
                <p className="mt-1.5 text-[13px] text-muted-foreground">{step.date}</p>
              )}
              {step.description && (
                <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RefundTimeline;
