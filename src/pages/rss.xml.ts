import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const blog = await getCollection("blog");
	const feed = await getCollection("feed");

	// Sort blog posts by publish date
	const sortedBlog = blog.sort((a, b) => {
		return (
			new Date(b.data.publishDate).getTime() -
			new Date(a.data.publishDate).getTime()
		);
	});

	// Sort feed posts by ID (which contains timestamp)
	const sortedFeed = feed.sort((a, b) => {
		return b.id.localeCompare(a.id);
	});

	// Convert feed posts to RSS items
	const feedItems = sortedFeed.map((post) => {
		// Extract date from feed post ID (format: YYYYMMDDHHMM)
		const year = parseInt(post.id.slice(0, 4), 10);
		const month = parseInt(post.id.slice(4, 6), 10) - 1; // month is 0-indexed
		const day = parseInt(post.id.slice(6, 8), 10);
		const hours = parseInt(post.id.slice(8, 10), 10);
		const minutes = parseInt(post.id.slice(10, 12), 10);
		const pubDate = new Date(Date.UTC(year, month, day, hours, minutes));

		return {
			author: "Torben Haack",
			title: `Feed Update - ${pubDate.toISOString()}`,
			pubDate: pubDate,
			description: post.body, // Use the content as description
			categories: ["feed"],
			link: `/feed#${post.id}`,
		};
	});

	// Convert blog posts to RSS items
	const blogItems = sortedBlog.map((post) => ({
		author: "Torben Haack",
		title: post.data.title,
		pubDate: post.data.publishDate,
		description: post.data.description,
		categories: ["blog", ...(post.data.tags || [])],
		link: `/blog/${post.data.slug}`,
	}));

	// Combine and sort all items by publication date
	const allItems = [...blogItems, ...feedItems].sort((a, b) => {
		return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
	});

	return rss({
		title: "Torben Haack [t128n]",
		description: "",
		site: context.site as unknown as string,
		items: allItems,
		stylesheet: "/rss/styles.xsl",
	});
}
