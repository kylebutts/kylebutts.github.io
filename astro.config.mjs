import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
	site: 'https://www.kylebutts.com/',
	integrations: [
		mdx({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
			syntaxHighlight: "shiki",
			shikiConfig: {
				theme: "vitesse-light",
			},
		}),
		tailwind(),
		solid(),
		sitemap(),
	],
})
