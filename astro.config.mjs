import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import astroExpressiveCode from "astro-expressive-code"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"

// https://astro.build/config
export default defineConfig({
	site: "https://www.kylebutts.com/",
	integrations: [
		// expressiveCode(),
		astroExpressiveCode({
			themes: ["vitesse-light"],
			plugins: [pluginCollapsibleSections()],
			styleOverrides: {
				// You can also override styles
				borderRadius: "0rem",
				borderColor: "var(--color-zinc-200)",
				codeFontFamily:
					"var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				uiFontFamily: "var(--font-serif)",
        frames: {
          frameBoxShadowCssValue: "0rem",
          shadowColor: 'none',
          inlineButtonBackground: "var(--color-kyle-highlight)",
          inlineButtonBackgroundIdleOpacity: 0.3,
          inlineButtonBackgroundActiveOpacity: 0.4,
          inlineButtonBorder: "var(--color-kyle-highlight)",
          inlineButtonBorderOpacity: 1.0,
          inlineButtonForeground: "var(--color-kyle-highlight)",
        }
			},
			shiki: {
				langs: [
					JSON.parse(fs.readFileSync("./r.tmLanguage.gen.json", "utf-8")),
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
