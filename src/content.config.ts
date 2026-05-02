import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod/v4';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    cover: z.url(),
    demoLink: z.url().optional(),
    repoLink: z.url().optional(),
    date: z.date(),
    featured: z.boolean().default(false),
    status: z.enum(['prod', 'experiment', 'archived']).default('prod'),
    problem: z.string().optional(),
    solution: z.string().optional(),
    impact: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
