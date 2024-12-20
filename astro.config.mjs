import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
    site: "https://www.kylebutts.com/",
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "vitesse-light",
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        // rehypePlugins: [
        // 	[
        // 		rehypeKatex,
        // 		{
        // 			// Katex plugin options
        // 			fleqn: true,
        // 		},
        // 	],
        // ],
        gfm: true,
    },
    integrations: [mdx({}), tailwind(), solidJs()],
})