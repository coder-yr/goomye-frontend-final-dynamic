import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import userAvatar from "@/assets/user-avatar.jpg";
import { getProfile } from "@/lib/account";

const AccountData = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div>No profile data found.</div>;
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Account data</h2>
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userAvatar} alt={profile.name} />
          <AvatarFallback>{profile.name?.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div>
          <Badge className="mb-2 bg-accent text-accent-foreground">Essentials</Badge>
          <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Delivery Address</h4>
          <p className="text-muted-foreground">{profile.address}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Phone Number</h4>
          <p className="text-muted-foreground">{profile.phone}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Country</h4>
          <p className="text-muted-foreground">{profile.country}</p>
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