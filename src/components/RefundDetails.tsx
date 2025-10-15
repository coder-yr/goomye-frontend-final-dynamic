import { Card } from "@/components/ui/card";
import { Calendar, Info } from "lucide-react";

interface RefundDetailsProps {
  details: {
    reason: string;
    dueDate: string;
    packageCondition: string;
    info?: string;
  };
  amount: string | number;
  method: string;
}

const RefundDetails = ({ details, amount, method }: RefundDetailsProps) => {
  if (!details) return null;
  return (
    <div className="space-y-5">
      <Card className="p-6 border-border shadow-sm">
        <h2 className="text-[17px] font-semibold text-foreground mb-5">Details of the refund</h2>
        <div className="space-y-5">
          <div>
            <h3 className="text-[13px] font-semibold text-foreground mb-1.5">Refund reason</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {details.reason || "No reason provided"}
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-foreground mb-1.5">Due date</h3>
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{details.dueDate}</span>
            </div>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-foreground mb-1.5">Package condition</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {details.packageCondition}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 border-border shadow-sm">
        <h2 className="text-[17px] font-semibold text-foreground mb-4">The amount to be refunded</h2>
        <p className="text-[28px] font-bold text-foreground">₹{amount}</p>
      </Card>
      <Card className="p-6 border-border shadow-sm">
        <h2 className="text-[17px] font-semibold text-foreground mb-5">The chosen refund method</h2>
        <div className="space-y-3">
          <h3 className="text-[13px] font-semibold text-foreground">{method}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            The refund is processed by transferring the funds directly to your bank account.
          </p>
          {details.info && (
            <div className="flex gap-2.5 items-start rounded-lg bg-success-light p-3.5 mt-4">
              <Info className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <p className="text-[13px] text-success leading-relaxed">
                {details.info}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RefundDetails;
