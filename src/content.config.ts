import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  papers: defineCollection({
    loader: glob({
      pattern: "**/*.{md,mdx}",
      base: "./src/content/papers",
    }),
    schema: z.object({
      title: z.string(),
      author: z
        .array(
          z.object({
            name: z.string(),
            url: z.string().url(),
            affiliation: z.string(),
          }),
        )
        .optional(),
      links: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        )
        .optional(),
      date: z.string(),
      categories: z.array(z.string()).optional(),
      status: z.string(),
      summary: z.string().optional(),
      draft: z.boolean().default(false),
      order: z.number().default(0),
    }),
  }),
  "open-source": defineCollection({
    loader: glob({
      pattern: "**/*.{yaml,yml,json}",
      base: "./src/content/open-source",
    }),
    schema: z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string(),
    }),
  }),
  courses: defineCollection({
    loader: glob({
      pattern: "**/*.{yaml,yml,json}",
      base: "./src/content/courses",
    }),
    schema: z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string(),
    }),
  }),
  blog: defineCollection({
    loader: glob({
      pattern: "**/*.{md,mdx}",
      base: "./src/content/blog",
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      author: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      ),
      date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
      categories: z.array(z.string()),
      draft: z.boolean().default(false),
    }),
  }),
};
