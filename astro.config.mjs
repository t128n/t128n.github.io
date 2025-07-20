// @ts-check
import mcp from "astro-mcp";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    integrations: [mcp(), mdx(), icon()],
    vite: {
        css: {
            transformer: "lightningcss",
        },
    },
});