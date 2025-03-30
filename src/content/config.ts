// src/content/config.ts
import { z, defineCollection } from "astro:content";

// Define the blog collection schema
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        publishDate: z.date(),
        updatedDate: z.date().optional(),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
    }),
});

// Export the collections object with the blog collection
export const collections = {
    blog: blogCollection,
};