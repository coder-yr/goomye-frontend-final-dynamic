import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Package, Truck, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CheckoutBreadcrumb from "@/components/CheckoutBreadcrumb";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { processPayment, PaymentData, CheckoutData } from "@/lib/checkout";

const ReviewAndPay = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });

  const { items: orderItems, clearCart } = useCart();

  useEffect(() => {
    // Load checkout data from localStorage
    const savedCheckoutData = localStorage.getItem('checkoutData');
    if (savedCheckoutData) {
      try {
        const parsed = JSON.parse(savedCheckoutData);
        setCheckoutData(parsed);
        // Pre-fill billing address with shipping address
        setBillingAddress({
          firstName: parsed.shippingAddress.firstName,
          lastName: parsed.shippingAddress.lastName,
          address: parsed.shippingAddress.address,
          apartment: parsed.shippingAddress.apartment || "",
          city: parsed.shippingAddress.city,
          state: parsed.shippingAddress.state,
          zipCode: parsed.shippingAddress.zipCode,
          country: parsed.shippingAddress.country,
        });
      } catch (error) {
        console.error("Failed to parse checkout data:", error);
        toast.error("Invalid checkout data. Please start over.");
        navigate("/checkout");
      }
    } else {
      toast.error("No checkout data found. Please start over.");
      navigate("/checkout");
    }
  }, [navigate]);

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingInputChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkoutData) {
      toast.error("Checkout data not found");
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    // Validate payment details
    if (paymentMethod === "card") {
      const requiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
      const missingFields = requiredFields.filter(field => !cardDetails[field as keyof typeof cardDetails]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`);
        return;
      }

      if (!useShippingAddress) {
        const billingRequiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];
        const missingBillingFields = billingRequiredFields.filter(field => !billingAddress[field as keyof typeof billingAddress]);
        
        if (missingBillingFields.length > 0) {
          toast.error(`Please fill in billing address: ${missingBillingFields.join(', ')}`);
          return;
        }
      }
    }

    setIsLoading(true);
    
    try {
      const paymentData: PaymentData = {
        paymentMethod,
        cardDetails: paymentMethod === "card" ? cardDetails : undefined,
        billingAddress: useShippingAddress ? undefined : billingAddress,
        useShippingAddress,
      };

      const result = await processPayment({
        ...paymentData,
        cart: orderItems,
        shippingAddress: checkoutData.shippingAddress,
        shippingMethod: checkoutData.shippingMethod,
      });

      if (result.paymentStatus === "success") {
        // Store order details for confirmation page
        localStorage.setItem('orderConfirmation', JSON.stringify(result));
        localStorage.removeItem('checkoutData');
        
        // Clear cart
        clearCart();
        
        toast.success("Payment successful! Order confirmed.");
        navigate("/order-confirmation");
      } else {
        // Show specific error message from demo payment system
        const errorMessage = result.paymentError || result.message || "Payment failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutBreadcrumb currentStep={1} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Review Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleContinue} className="space-y-6">
              {/* Contact Details */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Contact details
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="text-sm underline hover:text-foreground"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{checkoutData?.email || "jamescollins@site.so"}</p>
              </div>
              {/* Shipping Address */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    Shipping address
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="text-sm underline hover:text-foreground"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">
                    {checkoutData?.shippingAddress ? 
                      `${checkoutData.shippingAddress.firstName} ${checkoutData.shippingAddress.lastName}` : 
                      "James Collins"
                    }
                  </p>
                  <p>
                    {checkoutData?.shippingAddress?.address || "280 Suzanne Throughway"}
                    {checkoutData?.shippingAddress?.apartment && `, ${checkoutData.shippingAddress.apartment}`}
                  </p>
                  <p>
                    {checkoutData?.shippingAddress ? 
                      `${checkoutData.shippingAddress.city}, ${checkoutData.shippingAddress.state} ${checkoutData.shippingAddress.zipCode}, ${checkoutData.shippingAddress.country}` :
                      "New York, Breannabury, OR 45801, US"
                    }
                  </p>
                </div>
              </div>
              {/* Shipping Method */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    Shipping method
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="text-sm underline hover:text-foreground"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {checkoutData?.shippingMethod === "free" ? "Free, 2-4 working days" : 
                   checkoutData?.shippingMethod === "sep29" ? "$9, Sep 29" :
                   checkoutData?.shippingMethod === "nominated" ? "$10, Nominated day" :
                   "Free, 2-4 working days"}
                </p>
              </div>
              {/* Demo Payment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Demo Payment System</h3>
                    <p className="text-sm text-blue-800 mb-3">
                      This is a demo payment system. Use these test card numbers:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Success</span>
                        <code className="bg-white px-2 py-1 rounded border">4242 4242 4242 4242</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Decline</span>
                        <code className="bg-white px-2 py-1 rounded border">4000 0000 0000 0002</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Expired</span>
                        <code className="bg-white px-2 py-1 rounded border">4000 0000 0000 0069</code>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      Use any future expiry date (MM/YY) and any 3-digit CVV.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Payment methods</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 h-12 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 h-12 px-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h8.536c2.844 0 4.793 1.167 5.187 3.106.177.878.047 1.715-.362 2.353a4.25 4.25 0 0 1-.469.599c-.907.94-2.292 1.407-4.117 1.407h-2.08a.77.77 0 0 0-.76.653l-.92 5.835-.028.174a.384.384 0 0 1-.38.327z" />
                    </svg>
                    <span className="font-medium">PayPal</span>
                  </button>
                </div>
              </div>
              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Card details</h2>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Card number"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                      className="pr-32"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {/* Card icons here */}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      type="text" 
                      placeholder="MM/YY" 
                      value={cardDetails.expiryDate}
                      onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                      required 
                    />
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="CVC" 
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                        className="pr-10" 
                        required 
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {/* CVC icon here */}
                      </div>
                    </div>
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Name on card" 
                    value={cardDetails.cardName}
                    onChange={(e) => handleCardInputChange('cardName', e.target.value)}
                    required 
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="default-payment" />
                    <label
                      htmlFor="default-payment"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Set as default payment method
                    </label>
                  </div>
                </div>
              )}
              {/* Billing Address */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Billing address</h2>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="same-address"
                    checked={useShippingAddress}
                    onCheckedChange={(checked) => setUseShippingAddress(checked as boolean)}
                  />
                  <label
                    htmlFor="same-address"
                    className="text-sm cursor-pointer leading-relaxed"
                  >
                    Use my shipping address
                  </label>
                </div>
                {useShippingAddress ? (
                  <div className="text-sm text-muted-foreground pl-6">
                    <p>
                      {checkoutData?.shippingAddress ? 
                        `${checkoutData.shippingAddress.city}, ${checkoutData.shippingAddress.address}` :
                        "New York, 280 Suzanne Throughway"
                      }
                    </p>
                    <p>
                      {checkoutData?.shippingAddress ? 
                        `${checkoutData.shippingAddress.state} ${checkoutData.shippingAddress.zipCode}, ${checkoutData.shippingAddress.country}` :
                        "Breannabury, OR 45801, US"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pl-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        type="text" 
                        placeholder="First name" 
                        value={billingAddress.firstName}
                        onChange={(e) => handleBillingInputChange('firstName', e.target.value)}
                        required 
                      />
                      <Input 
                        type="text" 
                        placeholder="Last name" 
                        value={billingAddress.lastName}
                        onChange={(e) => handleBillingInputChange('lastName', e.target.value)}
                        required 
                      />
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Address" 
                      value={billingAddress.address}
                      onChange={(e) => handleBillingInputChange('address', e.target.value)}
                      required 
                    />
                    <Input 
                      type="text" 
                      placeholder="Apartment, suite, etc. (optional)" 
                      value={billingAddress.apartment}
                      onChange={(e) => handleBillingInputChange('apartment', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        type="text" 
                        placeholder="City" 
                        value={billingAddress.city}
                        onChange={(e) => handleBillingInputChange('city', e.target.value)}
                        required 
                      />
                      <Input 
                        type="text" 
                        placeholder="State" 
                        value={billingAddress.state}
                        onChange={(e) => handleBillingInputChange('state', e.target.value)}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        type="text" 
                        placeholder="ZIP code" 
                        value={billingAddress.zipCode}
                        onChange={(e) => handleBillingInputChange('zipCode', e.target.value)}
                        required 
                      />
                      <Input 
                        type="text" 
                        placeholder="Country" 
                        value={billingAddress.country}
                        onChange={(e) => handleBillingInputChange('country', e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/checkout")}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <div className="flex items-center gap-4">
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 bg-primary rounded-full" />
                    <div className="h-1 w-16 bg-primary rounded-full" />
                    <div className="h-1 w-16 bg-muted rounded-full" />
                  </div>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      "Complete Order"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutOrderSummary
              items={orderItems.map((item) => ({
                id: item.productId,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                image: item.image,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
              }))}
              onEditCart={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPay;
