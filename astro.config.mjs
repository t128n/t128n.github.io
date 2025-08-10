// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import mcp from "astro-mcp";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

const productionMode = process.env.NODE_ENV === "production";
const astroSite = productionMode
	? "https://t128n.github.io/"
	: "http://localhost:4321/";

// https://astro.build/config
export default defineConfig({
	site: astroSite,
	integrations: [mcp(), mdx(), icon(), sitemap(), compress()],
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
		remarkPlugins: [remarkReadingTime],
	},
	vite: {
		css: {
			transformer: "lightningcss",
		},
	},
});
