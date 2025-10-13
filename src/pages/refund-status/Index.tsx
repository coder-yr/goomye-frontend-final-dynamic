import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import RefundTimeline from "@/components/RefundTimeline";
import RefundDetails from "@/components/RefundDetails";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Index = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [refund, setRefund] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use correct API base URL for backend
    const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:8001/api"}/returns/refund-status/${orderId || "957684673"}`;
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setRefund(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load refund data");
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div>Loading refund status...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!refund) return <div>No refund data found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <h1 className="text-[28px] font-bold text-foreground mb-10">
          Track the refund of order #{refund.orderId || orderId || ""}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <div className="order-2 lg:order-1">
            <RefundTimeline steps={refund.timeline} />
          </div>
          <div className="order-1 lg:order-2">
            <RefundDetails details={refund.details} amount={refund.refundAmount} method={refund.refundMethod?.type} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-start pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto text-[13px] h-10 px-5"
            onClick={() => navigate("/account")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to your account
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto text-[13px] h-10 px-5">
            <X className="w-4 h-4 mr-2" />
            Cancel the refund
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
