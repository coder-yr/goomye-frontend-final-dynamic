import { Search, Heart, ShoppingCart, Menu, Headphones, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/goomye-logo.png";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";
import MegaMenu from "./MegaMenu";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header className="w-full border-b bg-background">
      {/* Top Bar */}
      <div className="border-b py-2">
        <div className="container mx-auto flex items-center justify-between px-4">
          <button
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate('/orders')}
          >
            <BookOpen className="h-4 w-4" />
            <span>ORDER TRACKING</span>
          </button>
          <div className="flex items-center gap-6 text-sm">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Headphones className="h-4 w-4" />
              <span>CONTACT US</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>BLOG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="GOOMYE Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for"
                  className="w-full rounded-full border-2 pl-6 pr-12 h-12"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/wishlist')}>
                <Heart className="h-6 w-6 text-primary" />
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary"
                >
                  0
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-primary" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="default" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-8">
                {/* Shop by Category with MegaMenu on hover */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <Button variant="ghost" className="gap-2 font-medium">
                    <Menu className="h-5 w-5" />
                    Shop by Category
                  </Button>
                  {showMegaMenu && (
                    <div className="absolute left-0 top-full z-50">
                      <MegaMenu />
                    </div>
                  )}
                </div>
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </a>
              <a href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </a>
            </nav>

            {isLoggedIn ? (
              <Button variant="ghost" className="gap-2" onClick={() => navigate("/account") }>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">My account</span>
              </Button>
            ) : (
              <Button variant="outline" className="gap-2" onClick={() => navigate("/login") }>
                <span className="text-sm font-medium">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      </header>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cartItems={items} />
    </>
  );
};

export default Navbar;
