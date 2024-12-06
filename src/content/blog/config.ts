import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
});

export const collections = {
  'blog': blogCollection,
};
