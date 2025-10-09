import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { getAddresses } from "@/lib/account";

const MyAddresses = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  useEffect(() => {
    getAddresses().then(data => setAddresses(data.addresses)).catch(console.error);
  }, []);
  if (!addresses.length) return null;
  const preferred = addresses[0];
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">My addresses</h2>
      <div className="space-y-4">
        <Badge className="bg-accent text-accent-foreground">Preferred address</Badge>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{preferred?.name || ""}</h3>
          <p className="text-muted-foreground italic">{preferred?.address}</p>
        </div>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </div>
  );
};

export default MyAddresses;