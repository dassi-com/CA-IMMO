import { use } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage(props: { searchParams: Promise<{ priceMin?: string; priceMax?: string; city?: string; property_type?: string }> }) {
  const searchParams = use(props.searchParams);

  return (
    <SearchContent
      priceMin={searchParams.priceMin ?? ''}
      priceMax={searchParams.priceMax ?? ''}
      city={searchParams.city ?? ''}
      property_type={searchParams.property_type ?? ''}
    />
  );
}
