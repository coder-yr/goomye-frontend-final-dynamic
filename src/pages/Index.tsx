import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
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
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Sign In button removed, now handled by Navbar */}
      <main className="overflow-x-hidden">
        <HeroCarousel />
        <CategoriesSection />
        <TrendingDeals />
        <FeaturedProducts />
        <Testimonials />
        <CallToAction />
        <PromotionalBanner />
        <FeaturedCategories />
        <PromotionalCards />
        <CollectionsSection />
        {/* <BrandedProducts /> */}
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
