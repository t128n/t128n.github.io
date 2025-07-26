import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { generateSlug } from "@/lib/slug";

const dynamicDate = z
	.string()
	.or(z.date())
	.transform((val) => new Date(val));

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/blog/" }),
	schema: z
		.object({
			title: z.string(),
			description: z.string().optional(),
			publishDate: dynamicDate,
			updatedDate: dynamicDate.optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().optional().default(false),
			relatedPosts: z.array(z.string()).optional(),
			slug: z.string().optional(),
		})
		.transform((data) => ({
			...data,
			slug: data.slug || generateSlug(data.title, data.publishDate),
		})),
});

const feedCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/feed/" }),
	schema: z.object({}),
});

export const collections = {
	blog: blogCollection,
	feed: feedCollection,
};
