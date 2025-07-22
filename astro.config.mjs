// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mcp from "astro-mcp";

// https://astro.build/config
export default defineConfig({
	site: "https://t128n.github.io",
	integrations: [mcp(), mdx(), icon(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: "vitesse-dark",
		},
	},
	vite: {
		css: {
			transformer: "lightningcss",
		},
	},
});
