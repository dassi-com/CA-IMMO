import { use } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage(props: { searchParams: Promise<{ token?: string; email?: string }> }) {
  const searchParams = use(props.searchParams);

  return (
    <ResetPasswordForm
      token={searchParams.token ?? null}
      email={searchParams.email ?? null}
    />
  );
}
