import { Stylesheet } from 'lunchbox';
import type { State } from '@/plugins/session.ts';
import { defineApp } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';

export default defineApp<State>((_, ctx) => {
  return (
    <>
      <Head>
        <title>remember.land</title>
        <Stylesheet />
      </Head>
      <body class='clr-bg-panel clr-txt-base txt-paragraph'>
        <ctx.Component />
      </body>
    </>
  );
});
