import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingDeals from "@/components/TrendingDeals";
import PromotionalBanner from "@/components/PromotionalBanner";
import FeaturedCategories from "@/components/FeaturedCategories";
import PromotionalCards from "@/components/PromotionalCards";
import CollectionsSection from "@/components/CollectionsSection";
import BrandedProducts from "@/components/BrandedProducts";
import SummerDeals from "@/components/SummerDeals";
import CuratedSection from "@/components/CuratedSection";
import GiftBanners from "@/components/GiftBanners";
import UnboxedSection from "@/components/UnboxedSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";

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
        <CollectionsSection />
        <BrandedProducts />
        <SummerDeals />
        <CuratedSection />
        <GiftBanners />
        <UnboxedSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
