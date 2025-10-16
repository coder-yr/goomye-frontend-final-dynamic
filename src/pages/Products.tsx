import { ChevronRight, Home, ArrowUpDown } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortKey = "price_asc" | "price_desc" | undefined;

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>(undefined);
  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (sortKey) params.set("sort", sortKey);
    return params.toString();
  }, [sortKey]);

  useEffect(() => {
  getProducts(query)
      .then((res) => {
        const list = res && (res.products ?? res);
        if (Array.isArray(list)) setProducts(list);
      })
      .catch(() => {});
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors" aria-label="Go to homepage">
              <Home className="w-4 h-4 cursor-pointer" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium ">Products</span>
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
                  <DropdownMenuItem onClick={() => setSortKey("price_asc")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortKey("price_desc")}>Price: High to Low</DropdownMenuItem>
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
                    id={product.id}
                    image={Array.isArray(product.images) ? product.images[0] : product.image}
                    title={product.title ?? product.name}
                    price={product.price}
                    originalPrice={product.originalPrice ?? product.mrp ?? product.price}
                    rating={product.rating ?? 4}
                    alt={product.alt ?? product.name}
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
