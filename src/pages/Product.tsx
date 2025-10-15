import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "@/lib/api";
import { Star, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductOptions from "@/components/product/ProductOptions";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductDescription from "@/components/product/ProductDescription";
import RelatedProducts from "@/components/product/RelatedProducts";
import { ReviewsSection } from "@/components/ReviewsSection";
import { useCart } from "@/context/CartContext";
import { addToWishlist } from "@/lib/user";

const ProductPage = () => {
  const { addItem } = useCart();
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(id!);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  if (error || !product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Product Gallery */}
          <ProductGallery images={product.images || []} />

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div className="space-y-2 card-ui-class">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-semibold">{product.stockStatus || "In Stock"}</span>
                <Badge variant="secondary" className="text-xs">{product.reviewsCount || 0} Reviews</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-semibold">{product.deliveryLocation || "Deliver to your location"}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl lg:text-4xl font-bold">${product.price}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-input rounded px-3 py-1 text-sm"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mb-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={async () => {
                    setIsFavorite(!isFavorite);
                    if (!product) return;
                    await addToWishlist({
                      id: product.id,
                      name: product.name,
                      image: product.images?.[0] || "",
                      price: product.price
                    });
                  }}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  Add to favorites
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (!product) return;
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0] || "",
                      color: selectedColor,
                      size: selectedStorage,
                      quantity,
                    });
                  }}
                >
                  <span className="mr-2">🛒</span>
                  Add to cart
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {product.retailerInfo || "Also available at competitive prices from authorized retailers, with optional Premium delivery for expedited shipping."}
              </p>
            </div>
            <ProductOptions 
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedStorage={selectedStorage}
              setSelectedStorage={setSelectedStorage}
            />
          </div>
        </div>

        {/* Tabs Section with Description and Specs Side by Side */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="questions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Questions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Description Text */}
              <div className="lg:col-span-2">
                <ProductDescription productId={product.id} />
              </div>

              {/* Right: Specs Cards */}
              <div className="space-y-6">
                <ProductSpecs productId={product.id} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <ReviewsSection />
          </TabsContent>
          
          <TabsContent value="questions">
            <p className="text-muted-foreground">Questions content coming soon...</p>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <RelatedProducts />
      </div>
      {/* Product Reviews Section */}
      <div className="mt-12">
        <ReviewsSection />
      </div>
    </div>
  );
};

export default ProductPage;