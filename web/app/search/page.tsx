import SearchContent from './SearchContent';

export default async function SearchPage(props: { searchParams: Promise<{ priceMin?: string; priceMax?: string; city?: string; property_type?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <SearchContent
      priceMin={searchParams.priceMin ?? ''}
      priceMax={searchParams.priceMax ?? ''}
      city={searchParams.city ?? ''}
      property_type={searchParams.property_type ?? ''}
    />
  );
}
