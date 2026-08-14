import HeroSection from '@/components/ui/HeroSection';
import FeaturedProperties from '@/components/properties/FeaturedProperties';
import ExplorePopularCities from '@/components/home/ExplorePopularCities';
import ReadyToFindProperty from '@/components/home/ReadyToFindProperty';
import BrowseByPropertyType from '@/components/home/BrowseByPropertyType';
import TrustedAgents from '@/components/home/TrustedAgents';
import PropertyBuyRentRelocate from '@/components/home/PropertyBuyRentRelocate';
import TrustedRealEstateAgents from '@/components/home/TrustedRealEstateAgents';
import MobileAppPreview from '@/components/home/MobileAppPreview';
import TrustedPartners from '@/components/home/TrustedPartners';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <ExplorePopularCities />
      <ReadyToFindProperty />
      <BrowseByPropertyType />
      <PropertyBuyRentRelocate />
      <TrustedAgents />
      <TrustedRealEstateAgents />
      <MobileAppPreview />
      <TrustedPartners />
    </>
  );
}
