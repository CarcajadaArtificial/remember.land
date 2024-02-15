import { defineConfig } from '$fresh/server.ts';
import kvOAuthPlugin from './plugins/kv_oauth.ts';
import twindPlugin from '$fresh/plugins/twind.ts';
import twindConfig from './twind.config.ts';

export default defineConfig({
  plugins: [
    kvOAuthPlugin,
    twindPlugin(twindConfig),
  ],
});
