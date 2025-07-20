import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { generateSlug } from "@/lib/slug";

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/blog/" }),
	schema: z
		.object({
			title: z.string(),
			description: z.string().optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
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

export const collections = {
	blog: blogCollection,
};
