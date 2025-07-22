import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { generateOgImageResponse } from "@/lib/og";

// Static page meta lookup
interface StaticPageMeta {
	title: string;
	description: string;
}
const STATIC_PAGES: Record<string, StaticPageMeta> = {
	about: {
		title: "About Torben Haack",
		description: "Building software, sharing knowledge and always learning.",
	},
	index: {
		title: "Torben Haack",
		description:
			"Software engineer focused on building reliable platforms, sharing practical knowledge and mentoring developers. Real-world projects, open-source tools and insights for tech professionals.",
	},
	search: {
		title: "Search",
		description: "Search through my blog posts and resources.",
	},
};

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	const blogSlugs = posts.map((post) => ["blog", post.data.slug]);
	const staticSlugs = Object.keys(STATIC_PAGES).map((slug) => [slug]);
	return [...blogSlugs, ...staticSlugs].map((slugArr) => ({
		params: { slug: slugArr.join("/") },
		props: { slug: slugArr },
	}));
}

export async function GET(context: APIContext) {
	const slugArr = context.props.slug as string[];
	const slug = slugArr.join("/");

	// Blog post: /blog/[slug]
	if (slugArr[0] === "blog" && slugArr.length === 2) {
		const posts = await getCollection("blog");
		const post = posts.find((p) => p.data.slug === slugArr[1]);
		if (post) {
			return await generateOgImageResponse(
				post.data.title,
				post.data.description as string,
				`blog/${post.data.slug}`,
			);
		}
	}

	// Static page: /about, /index, etc.
	const staticMeta = STATIC_PAGES[slug];
	if (staticMeta) {
		return await generateOgImageResponse(
			staticMeta.title,
			staticMeta.description,
			slug === "index" ? "" : slug,
		);
	}

	return new Response("Not found", { status: 404 });
}
