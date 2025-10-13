import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="w-full py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to upgrade your tech?</h2>
            <p className="text-primary-foreground/90 mb-6">
              Join thousands of satisfied customers and experience premium tech products with our exclusive deals and top-notch customer service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="group">
                Shop now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                View deals
              </Button>
            </div>
          </div>
          <div className="hidden md:block w-full max-w-sm">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-full opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full opacity-30"></div>
              <div className="relative z-10 bg-background/10 backdrop-blur-sm p-8 rounded-xl border border-primary-foreground/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Limited Time Offer</h3>
                  <p className="text-primary-foreground/80 mb-4">Get 15% off on your first purchase</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-background/20 p-2 rounded-md">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-background/20 p-2 rounded-md">
                      <div className="text-2xl font-bold">00</div>
                      <div className="text-xs">Mins</div>
                    </div>
                    <div className="bg-background/20 p-2 rounded-md">
                      <div className="text-2xl font-bold">00</div>
                      <div className="text-xs">Secs</div>
                    </div>
                    <div className="bg-background/20 p-2 rounded-md">
                      <div className="text-2xl font-bold">00</div>
                      <div className="text-xs">Ms</div>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">Claim Offer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;