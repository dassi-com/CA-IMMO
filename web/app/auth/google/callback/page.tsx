import { use } from 'react';
import CallbackHandler from './CallbackHandler';

export default function GoogleCallbackPage(props: { searchParams: Promise<{ accessToken?: string; refreshToken?: string; role?: string }> }) {
  const searchParams = use(props.searchParams);

  return (
    <CallbackHandler
      accessToken={searchParams.accessToken ?? null}
      refreshToken={searchParams.refreshToken ?? null}
      role={searchParams.role ?? null}
    />
  );
}
