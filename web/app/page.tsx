import HeroSection from '@/components/ui/HeroSection';
import FeaturedProperties from '@/components/properties/FeaturedProperties';
import ExplorePopularCities from '@/components/home/ExplorePopularCities';
import ReadyToFindProperty from '@/components/home/ReadyToFindProperty';
import BrowseByPropertyType from '@/components/home/BrowseByPropertyType';
import TrustedRealEstateAgents from '@/components/home/TrustedRealEstateAgents';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <ExplorePopularCities />
      <ReadyToFindProperty />
      <BrowseByPropertyType />
      <TrustedRealEstateAgents />
    </>
  );
}
