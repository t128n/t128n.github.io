// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mcp from "astro-mcp";


const productionMode = process.env.NODE_ENV === "production";
const astroSite = productionMode
	? "https://t128n.github.io"
	: "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
	site: astroSite,
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
