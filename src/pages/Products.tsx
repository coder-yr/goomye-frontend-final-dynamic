import { ChevronRight, Home, ArrowUpDown } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    image: "/apple-imac-27.jpg",
    title: "Apple iMac 27\"",
    price: 1199,
    originalPrice: 1399,
    rating: 5,
    alt: "Apple iMac 27\"",
  },
  {
    id: 2,
    image: "/playstation-5-slim.png",
    title: "PlayStation 5 Slim Console",
    price: 499,
    originalPrice: 599,
    rating: 4,
    alt: "PlayStation 5 Slim Console",
  },
  {
    id: 3,
    image: "/ipad-pro-13.jpg",
    title: "iPad Pro 13-inch (M4): XDR Display",
    price: 1199,
    originalPrice: 1299,
    rating: 5,
    alt: "iPad Pro 13-inch (M4): XDR Display",
  },
  {
    id: 4,
    image: "/xbox-series-s.jpg",
    title: "Xbox Series S 1TB SSD",
    price: 299,
    originalPrice: 399,
    rating: 4,
    alt: "Xbox Series S 1TB SSD",
  },
  {
    id: 5,
    image: "/iphone-15-pro-max.png",
    title: "Apple iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    rating: 5,
    alt: "Apple iPhone 15 Pro Max",
  },
  {
    id: 6,
    image: "/assets/apple-imac-27.jpg",
    title: "iMac 24\" (2023)",
    price: 1499,
    originalPrice: 1699,
    rating: 5,
    alt: "iMac 24\" (2023)",
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span>Products</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Electronics</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <FilterSidebar />
        
        <main className="flex-1">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Electronics</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
                  <DropdownMenuItem>Name: Z to A</DropdownMenuItem>
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <ProductCard 
                    {...product}
                    image={product.image}
                  />
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" className="px-8">
                Load more
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
