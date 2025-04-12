import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const writings = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './writings' }),
    schema: z.object({
        title: z.string(),
        published: z.date(),
        updated: z.date().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
    })
})

export const collections = { writings };