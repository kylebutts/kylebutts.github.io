import { z, defineCollection } from 'astro:content';

export const collections = {
  'papers': defineCollection({
    type: 'content', 
    schema: z.object({
      title: z.string(),
      author: z.array(z.object({
        name: z.string(),
        url: z.string().url(),
        affiliation: z.string()
      })),
      category: z.array(z.string()),
      links: z.array(z.object({
        name: z.string(),
        url: z.string(),
      })),
      date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
      status: z.string(),
      summary: z.string().optional(),
      display: z.boolean(),
      order: z.number().default(0)
    }),
  }),
  'open-source': defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string()
    }),
  }),
  'courses': defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string()
    }),
  }),
  'blog': defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
      description: z.string(),
      author: z.object({
        name: z.string(),
        url: z.string().url()
      }),
      category: z.array(z.string()),
      display: z.boolean(),
    })
  })
}
