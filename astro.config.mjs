import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import solidJs from "@astrojs/solid-js"
import { satteri } from "@astrojs/markdown-satteri"
import mdx from "@astrojs/mdx"
import astroExpressiveCode from "astro-expressive-code"
// import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import * as fs from "fs"

// https://astro.build/config
export default defineConfig({
	site: "https://www.kylebutts.com/",
	integrations: [
		// expressiveCode(),

		astroExpressiveCode({
			themes: ["vitesse-light"],
			// plugins: [pluginCollapsibleSections()],
			styleOverrides: {
				// You can also override styles
				borderRadius: "0rem",
				borderColor: "var(--color-zinc-200)",
				codeFontFamily:
					"var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				uiFontFamily: "var(--font-serif)",
				frames: {
					frameBoxShadowCssValue: "0rem",
					shadowColor: "none",
					inlineButtonBackground: "var(--color-kyle-highlight)",
					inlineButtonBackgroundIdleOpacity: 0.3,
					inlineButtonBackgroundActiveOpacity: 0.4,
					inlineButtonBorder: "var(--color-kyle-highlight)",
					inlineButtonBorderOpacity: 1.0,
					inlineButtonForeground: "var(--color-kyle-highlight)",
				},
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
		processor: satteri({
			features: {
				directive: true,
				math: true,
				headingAttributes: true,
			},
			// mdastPlugins: [katex()],
		}),
	},

	vite: {
		plugins: [tailwindcss()],
		ssr: {
			external: ["@resvg/resvg-js"],
		},
		build: {
			rollupOptions: {
				external: ["@resvg/resvg-js"],
			},
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
})
