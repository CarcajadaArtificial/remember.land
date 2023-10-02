import { Stylesheet } from 'lunchbox';
import { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>remember.land</title>
        <Stylesheet />
      </Head>
      <body class='clr-bg-panel clr-txt-base txt-paragraph'>
        <Component />
      </body>
    </>
  );
}
