import { Button } from "@/components/ui/button";
import bannerImage from "@/assets/cmf-phone-banner.jpg";

const PromotionalBanner = () => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-muted">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-16 space-y-6">
              <div className="space-y-2">
                <div className="text-xl font-bold text-muted-foreground tracking-wider">
                  cmf
                </div>
                <div className="text-xs text-muted-foreground">by NOTHING</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">CMF PHONE 2 PRO</h2>
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  Starting at <span className="text-3xl">₹17,999</span>*
                </p>
                <p className="text-sm text-muted-foreground">*Inclusive of all Offers</p>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Buy now
              </Button>
            </div>
            <div className="hidden md:block h-full">
              <img
                src={bannerImage}
                alt="CMF Phone 2 Pro in multiple colors"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
