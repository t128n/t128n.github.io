import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const blog = await getCollection("blog");
	const sortedBlog = blog.sort((a, b) => {
		return (
			new Date(b.data.publishDate).getTime() -
			new Date(a.data.publishDate).getTime()
		);
	});

	return rss({
		title: "Torben Haack [t128n]",
		description: "",
		site: context.site as unknown as string,
		items: sortedBlog.map((post) => ({
			author: "Torben Haack",
			title: post.data.title,
			pubDate: post.data.publishDate,
			description: post.data.description,
			categories: post.data.tags || [],
			link: `/blog/${post.data.slug}`,
		})),
		stylesheet: "/rss/styles.xsl",
	});
}
