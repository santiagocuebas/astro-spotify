import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  output: 'server',
  integrations: [svelte()],
  adapter: netlify()
});