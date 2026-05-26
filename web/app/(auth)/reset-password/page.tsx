import ResetPasswordForm from './ResetPasswordForm';

export default async function ResetPasswordPage(props: { searchParams: Promise<{ token?: string; email?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <ResetPasswordForm
      token={searchParams.token ?? null}
      email={searchParams.email ?? null}
    />
  );
}
