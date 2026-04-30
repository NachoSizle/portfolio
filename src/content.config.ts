import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    cover: z.string().url(),
    demoLink: z.string().url().optional(),
    repoLink: z.string().url().optional(),
    date: z.date(),
  }),
});

export const collections = {
  projects,
};
