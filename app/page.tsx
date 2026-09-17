import { MotionConfig } from "framer-motion";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { TrustSection } from "@/components/landing/TrustSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col bg-background">
        <LandingNav />
        <main className="flex-1">
          <Hero />
          <FeatureSection />
          <ProductPreview />
          <TrustSection />
        </main>
        <LandingFooter />
      </div>
    </MotionConfig>
  );
}
