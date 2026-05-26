import CallbackHandler from './CallbackHandler';

export default async function GoogleCallbackPage(props: { searchParams: Promise<{ accessToken?: string; refreshToken?: string; role?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <CallbackHandler
      accessToken={searchParams.accessToken ?? null}
      refreshToken={searchParams.refreshToken ?? null}
      role={searchParams.role ?? null}
    />
  );
}
