import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import userAvatar from "@/assets/user-avatar.jpg";

interface AccountDataProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    avatarUrl?: string;
  };
}

const AccountData = ({ user }: AccountDataProps) => {
  const name = user?.name || "demo demo";
  const email = user?.email || "guest@example.com";
  const phone = user?.phone || "N/A";
  const address = user?.address || "N/A";
  const country = user?.country || "N/A";

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Account data</h2>
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl || userAvatar} alt={name} />
          <AvatarFallback>{name?.slice(0,2)?.toLowerCase() || "de"}</AvatarFallback>
        </Avatar>
        <div>
          <Badge className="mb-2 bg-accent text-accent-foreground">Essentials</Badge>
          <h3 className="text-2xl font-bold text-foreground">{name}</h3>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
          <p className="text-muted-foreground">{email}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Delivery Address</h4>
          <p className="text-muted-foreground">{address}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Phone Number</h4>
          <p className="text-muted-foreground">{phone}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Country</h4>
          <p className="text-muted-foreground">{country}</p>
        </div>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Edit className="h-4 w-4 mr-2" />
        Edit your data
      </Button>
    </div>
  );
};

export default AccountData;