import FeatureSection from "@/components/homepage/feature-section";
import HeroSection from "@/components/homepage/hero-section";
import LatestArrivals from "@/components/homepage/latest-arrivals";
import { OurBrandsSection } from "@/components/homepage/our-brands-section";
import { PageProps } from "@/config/types";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <HeroSection searchParams={searchParams}/>
      </Suspense>
      
      <FeatureSection/>
      <LatestArrivals/>
      <OurBrandsSection/>
    </div>
  );
}
