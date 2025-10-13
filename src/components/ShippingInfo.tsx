import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ShippingInfoProps {
  name: string;
  address: string;
  city: string;
  phone: string;
}

const ShippingInfo = ({ name, address, city, phone }: ShippingInfoProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Shipping address</h3>
      <div className="space-y-1 text-sm">
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{phone}</p>
      </div>
      <Button variant="ghost" size="sm" className="mt-4 px-0">
        <Pencil className="w-4 h-4 mr-2" />
        Change address
      </Button>
    </div>
  );
};

export default ShippingInfo;
