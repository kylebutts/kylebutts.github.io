import { z, defineCollection } from "astro:content"

export const collections = {
	papers: defineCollection({
		type: "content",
		schema: z.object({
			title: z.string(),
			author: z
				.array(
					z.object({
						name: z.string(),
						url: z.string().url(),
						affiliation: z.string(),
					})
				)
				.optional(),
			links: z.array(
				z.object({
					name: z.string(),
					url: z.string(),
				})
			),
			date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
      categories: z.array(z.string()).optional(),
			status: z.string(),
			summary: z.string().optional(),
			draft: z.boolean().default(false),
			order: z.number().default(0),
		}),
	}),
	"open-source": defineCollection({
		type: "data",
		schema: z.object({
			title: z.string(),
			url: z.string().url(),
			description: z.string(),
		}),
	}),
	courses: defineCollection({
		type: "data",
		schema: z.object({
			title: z.string(),
			url: z.string().url(),
			description: z.string(),
		}),
	}),
	blog: defineCollection({
		type: "content",
		schema: z.object({
			title: z.string(),
			description: z.string(),
      author: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        })
      ),
      date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
			categories: z.array(z.string()),
			draft: z.boolean().default(false),
		}),
	}),
}
