// @ts-check

import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mcp from "astro-mcp";

// https://astro.build/config
export default defineConfig({
	integrations: [mcp(), mdx(), icon()],
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
