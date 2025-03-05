import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import astroExpressiveCode from "astro-expressive-code"
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'


// https://astro.build/config
export default defineConfig({
	site: "https://www.kylebutts.com/",
	integrations: [
		// expressiveCode(),
    astroExpressiveCode({
      themes: ['vitesse-light'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      shiki: {
        langs: [
          JSON.parse(fs.readFileSync('./r.tmLanguage.gen.json', 'utf-8'))
        ],
      },
    }),
		mdx(),
		solidJs(),
	],

	plugins: [tailwindcss()],

	markdown: {
		// syntaxHighlight: "shiki",
		// shikiConfig: { theme: "vitesse-light" },
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
		gfm: true,
	},

	vite: { plugins: [tailwindcss()] },
})
