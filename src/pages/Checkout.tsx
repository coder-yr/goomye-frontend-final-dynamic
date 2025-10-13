import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CheckoutBreadcrumb from "@/components/CheckoutBreadcrumb";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { guestCheckout, CheckoutData } from "@/lib/checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState("free");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    newsletter: false,
  });

  const { items: orderItems } = useCart();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    setIsLoading(true);
    
    try {
      const checkoutData: CheckoutData = {
        email: formData.email,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        shippingMethod,
        cart: orderItems,
      };

      // Store checkout data for the next step
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      
      toast.success("Proceeding to payment...");
      navigate("/review-and-pay");
    } catch (error) {
      toast.error("Failed to proceed to checkout");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutBreadcrumb currentStep={0} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleContinue} className="space-y-8">
              {/* Guest Checkout Header */}
              <div>
                <h1 className="text-2xl font-bold mb-2">Checkout as Guest</h1>
                <p className="text-sm text-muted-foreground">
                  or{" "}
                  <button type="button" className="underline hover:text-foreground">
                    Log in
                  </button>{" "}
                  for faster checkout
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Contact details</h2>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required 
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Email me with news and others
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Shipping address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    type="text" 
                    placeholder="First name" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required 
                  />
                  <Input 
                    type="text" 
                    placeholder="Last name" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required 
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="USA">🇺🇸 United States of America</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                  </select>
                </div>
                <Input 
                  type="text" 
                  placeholder="Address 1" 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required 
                />
                <Input 
                  type="text" 
                  placeholder="Address 2" 
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                />
                <Input 
                  type="text" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    type="text" 
                    placeholder="State" 
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required 
                  />
                  <Input 
                    type="text" 
                    placeholder="Zip code" 
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default-address" />
                  <label
                    htmlFor="default-address"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Make this my default address
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Shipping method</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center justify-between p-4 border border-input rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="font-normal cursor-pointer">
                        2-4 working days
                      </Label>
                    </div>
                    <span className="text-sm font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-input rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sep29" id="sep29" />
                      <Label htmlFor="sep29" className="font-normal cursor-pointer">
                        Sep 29
                      </Label>
                    </div>
                    <span className="text-sm font-medium">$9</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-input rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nominated" id="nominated" />
                      <Label htmlFor="nominated" className="font-normal cursor-pointer">
                        Nominated day
                      </Label>
                    </div>
                    <span className="text-sm font-medium">$10</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </div>
          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutOrderSummary
              items={orderItems}
              onEditCart={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
