import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  site: "https://morebeachvolley.ch",
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  redirects: {
    '/': '/de/', 
  },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: "manual"
  },
  integrations: [tailwind(), sitemap(), icon()]
});