import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Percent, Filter, CreditCard, Apple } from "lucide-react";

const AppDownloadSection = () => {
  const features = [
    {
      id: 1,
      icon: Truck,
      title: "Premium Shipping",
      description: "Multiple shipping methods with real-time shipping cost",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: Percent,
      title: "Weekly Promotions",
      description: "Explore our weekly promotions for special discounts",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: Filter,
      title: "Advanced Filtering",
      description: "Advanced filtering options (by category, price and more)",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Secure Payment",
      description: "Integration with trusted payment gateways such as Stripe",
      iconColor: "text-green-600"
    }
  ];

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              Buy faster and from anywhere with our application
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your shopping experience with our convenient mobile application, 
              allowing you to browse and purchase items swiftly from anywhere and anytime.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-6 bg-background border-2"
              >
                <Apple className="h-6 w-6 mr-2" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">Mac App Store</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-6 bg-background border-2"
              >
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="p-6 space-y-3 bg-background hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
