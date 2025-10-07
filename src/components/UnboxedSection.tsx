import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UnboxedSection = () => {
  const articles = [
    {
      id: 1,
      badge: "UNBOXED",
      subtitle: "BY cromā",
      title: "Ten years on the wrist, and the Apple Watch has gone from a glorified accessory to a necessity",
      description: "10 years of the iconic Apple Watch",
      image: "/placeholder.svg",
      alt: "Apple Watch collection"
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-300 to-cyan-300 p-8 relative">
              <div className="absolute top-6 left-6">
                <div className="text-2xl font-bold text-red-600">UNBOXED</div>
                <div className="text-sm text-gray-800">BY cromā</div>
              </div>
              <div className="flex items-center justify-center min-h-[400px]">
                <img
                  src={articles[0].image}
                  alt={articles[0].alt}
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>
            <div className="text-white space-y-6 px-4 md:px-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {articles[0].title}
              </h2>
              <p className="text-xl text-gray-300">
                {articles[0].description}
              </p>
              <Button 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-bold px-8"
              >
                Read Now
              </Button>
            </div>
          </div>
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next article"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-16 h-1 bg-red-500 rounded-full"></div>
          <div className="w-16 h-1 bg-white/30 rounded-full"></div>
          <div className="w-16 h-1 bg-white/30 rounded-full"></div>
          <div className="w-16 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default UnboxedSection;
