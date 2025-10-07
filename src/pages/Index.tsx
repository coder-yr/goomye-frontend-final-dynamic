import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingDeals from "@/components/TrendingDeals";
import PromotionalBanner from "@/components/PromotionalBanner";
import FeaturedCategories from "@/components/FeaturedCategories";
import PromotionalCards from "@/components/PromotionalCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <CategoriesSection />
        <TrendingDeals />
        <PromotionalBanner />
        <FeaturedCategories />
        <PromotionalCards />
      </main>
    </div>
  );
};

export default Index;
