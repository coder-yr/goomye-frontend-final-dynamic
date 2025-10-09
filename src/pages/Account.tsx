import { useState } from "react";
import { Home, ChevronRight, Heart, ShoppingCart, Star, RefreshCw } from "lucide-react";
import Sidebar from "@/components/account/Sidebar";
import StatsCard from "@/components/account/StatsCard";
import AccountData from "@/components/account/AccountData";
import ActiveOrders from "@/components/account/ActiveOrders";
import MyAddresses from "@/components/account/MyAddresses";
import MyCards from "@/components/account/MyCards";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 md:p-8 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <span>Home</span>
            <ChevronRight className="h-4 w-4" />
            <span>My account</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Account</span>
          </nav>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard icon={Heart} label="Favorite products" value="455" />
            <StatsCard icon={ShoppingCart} label="Total Orders" value="124" />
            <StatsCard icon={Star} label="Reviews added" value="1,285" />
            <StatsCard icon={RefreshCw} label="Product returns" value="2" />
          </div>

          {/* Account Data */}
          <AccountData />

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
