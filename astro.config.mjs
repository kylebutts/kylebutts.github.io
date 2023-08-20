import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeCodeTitles, rehypeKatex],
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "rose-pine"
      }
    }), 
    tailwind(), 
    solid()
  ],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  experimental: {
    viewTransitions: true
  }
});
