import { JSX } from 'preact';
import { Button } from 'lunchbox';
import type { AuthProviders } from '@/utils/db/user.ts';
import IconBrandGithub from 'icons/brand-github.tsx';
import IconBrandGoogle from 'icons/brand-google.tsx';
import IconBrandAuth0 from 'icons/brand-auth0.tsx';

export interface iAuthButton {
  provider: AuthProviders;
}

const ProviderIcon = (
  props: { provider: AuthProviders },
): JSX.Element => {
  switch (props.provider) {
    case 'GitHub':
      return <IconBrandGithub />;
    case 'Google':
      return <IconBrandGoogle />;
    case 'Auth0':
      return <IconBrandAuth0 />;
    default:
      return <></>;
  }
};

export default function AuthButton(props: iAuthButton) {
  const { provider } = props;
  return (
    <a href={`/signin/${provider.toLowerCase()}`}>
      <Button class='min-w-full' type='panel'>
        <span class='mr-2'>
          {provider}
        </span>
        <ProviderIcon provider={provider} />
      </Button>
    </a>
  );
}
