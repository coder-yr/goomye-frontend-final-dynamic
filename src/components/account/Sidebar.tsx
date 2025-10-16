import { Home, Truck, Heart, Settings, LogOut, UserPlus, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import userAvatar from "@/assets/user-avatar.jpg";
import { useCart } from "@/context/CartContext";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const Sidebar = ({ activeTab, onTabChange, user }: SidebarProps) => {
  const menuItems = [
    { id: "profile", label: "My Profile", icon: UserPlus, route: "/account" },
    { id: "orders", label: "My orders", icon: Package, route: "/orders" },
    { id: "addresses", label: "Delivery addresses", icon: Home, route: "/addresses" },
    { id: "favorites", label: "Favourite items", icon: Heart, route: "/favorites" },
    { id: "wishlist", label: "Wishlist", icon: Heart, route: "/wishlist" },
  ];

  return (
    <aside className="w-full md:w-72 bg-card border-r border-border p-6 space-y-6">
      <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user?.avatarUrl || userAvatar} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name ? user.name.split(' ').map(n => n[0]).join('') : "JL"}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground">{user?.name || "Jese Leos (Personal)"}</h3>
          <p className="text-xs text-muted-foreground truncate">{user?.email || "jese@gmail.com"}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                window.location.href = item.route;
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-border space-y-1">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="h-5 w-5" />
          Settings
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          onClick={() => {
            localStorage.removeItem('token');
            const { clearCart } = useCart();
            clearCart();
            window.location.href = '/login';
          }}
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;