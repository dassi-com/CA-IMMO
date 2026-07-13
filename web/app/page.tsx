import HeroSection from '@/components/ui/HeroSection';
import FeaturedProperties from '@/components/properties/FeaturedProperties';
import ExplorePopularCities from '@/components/home/ExplorePopularCities';
import PropertyBuyRentRelocate from '@/components/home/PropertyBuyRentRelocate';
import TrustedAgents from '@/components/home/TrustedAgents';
import MobileAppPreview from '@/components/home/MobileAppPreview';
import BrowseByPropertyType from '@/components/home/BrowseByPropertyType';
import TrustedPartners from '@/components/home/TrustedPartners';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <ExplorePopularCities />
      <PropertyBuyRentRelocate />
      <TrustedAgents />
      <MobileAppPreview />
      <BrowseByPropertyType />
      <TrustedPartners />
    </>
  );
}
