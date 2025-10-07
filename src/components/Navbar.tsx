import { Search, Heart, ShoppingCart, Menu, Headphones, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-background">
      {/* Top Bar */}
      <div className="border-b py-2">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>ORDER TRACKING</span>
          </div>
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
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                GOOMYE
              </div>
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
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-6 w-6 text-primary" />
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary"
                >
                  0
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6 text-primary" />
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
              <Button variant="ghost" className="gap-2 font-medium">
                <Menu className="h-5 w-5" />
                Shop by Category
              </Button>
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

            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">My account</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
