import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, Heart, ShoppingCart, Star, RefreshCw } from "lucide-react";
import Sidebar from "@/components/account/Sidebar";
import StatsCard from "@/components/account/StatsCard";
import AccountData from "@/components/account/AccountData";
import ActiveOrders from "@/components/account/ActiveOrders";
import MyAddresses from "@/components/account/MyAddresses";
import MyCards from "@/components/account/MyCards";
import { getProfile, getStats } from "@/lib/api";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<{ name: string; email: string; avatarUrl?: string } | null>(null);
  const [stats, setStats] = useState({
    favoriteProducts: 0,
    totalOrders: 0,
    reviewsAdded: 0,
    productReturns: 0,
  });

  useEffect(() => {
    getProfile().then((profile) => {
      setUser({
        name: profile.name || profile.username || "User",
        email: profile.email || "",
        avatarUrl: profile.avatarUrl || undefined,
      });
    });
    getStats().then((data) => {
      setStats({
        favoriteProducts: data.favoriteProducts ?? 0,
        totalOrders: data.totalOrders ?? 0,
        reviewsAdded: data.reviewsAdded ?? 0,
        productReturns: data.productReturns ?? 0,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} user={user || undefined} />
        
        <main className="flex-1 p-6 md:p-8 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">My account</span>
          </nav>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard icon={Heart} label="Favorite products" value={stats.favoriteProducts} />
            <StatsCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} />
            <StatsCard icon={Star} label="Reviews added" value={stats.reviewsAdded} />
            <StatsCard icon={RefreshCw} label="Product returns" value={stats.productReturns} />
          </div>

          {/* Account Data */}
          <AccountData user={user || { name: '', email: '' }} />

          {/* Active Orders */}
          <ActiveOrders />

          {/* Bottom Row: Addresses & Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MyAddresses />
            <MyCards />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Account;
