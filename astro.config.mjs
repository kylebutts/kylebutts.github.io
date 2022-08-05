import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import mdx from "@astrojs/mdx"

import image from "@astrojs/image"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		react(),
		mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: { extends: [rehypeCodeTitles, rehypeKatex] },
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "rose-pine",
      },
    })
	],
	outDir: "./docs"
})
