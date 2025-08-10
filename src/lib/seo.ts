/**
 * SEO utilities for generating optimized titles, descriptions, and metadata
 */

interface SEOPageData {
	title: string;
	description: string;
	keywords?: string[];
	type?: "website" | "article" | "profile";
}

/**
 * Static pages SEO data
 */
export const STATIC_PAGES_SEO: Record<string, SEOPageData> = {
	index: {
		title: "Torben Haack",
		description:
			"Software engineer focused on building reliable platforms, sharing practical knowledge and mentoring developers. Real-world projects, open-source tools and insights for tech professionals.",
		keywords: [
			"software engineer",
			"developer",
			"programming",
			"tech blog",
			"software development",
		],
		type: "profile",
	},
	about: {
		title: "About Torben Haack",
		description:
			"Learn about Torben Haack, a software engineer passionate about building reliable systems, sharing knowledge through technical writing, and mentoring developers in modern software practices.",
		keywords: ["about", "software engineer", "bio", "experience", "background"],
		type: "profile",
	},
	search: {
		title: "Search",
		description:
			"Search through technical articles, tutorials, and insights on software engineering, development practices, and technology. Find specific topics and solutions quickly.",
		keywords: [
			"search",
			"find articles",
			"tech blog search",
			"programming tutorials",
		],
		type: "website",
	},
	feed: {
		title: "Feed",
		description:
			"Latest thoughts, updates, and quick insights from Torben Haack. A collection of development notes, tech observations, and professional updates.",
		keywords: ["blog feed", "updates", "thoughts", "development notes"],
		type: "website",
	},
};

/**
 * Generates an SEO-optimized title for the site
 */
export function generateSEOTitle(
	pageTitle: string,
	isHomePage = false,
): string {
	if (isHomePage) {
		return `${pageTitle} | Software Engineer & Technical Writer`;
	}
	return `${pageTitle} | t128n`;
}

/**
 * Truncates description to optimal length for meta descriptions
 */
export function truncateDescription(
	description: string,
	maxLength = 160,
): string {
	if (description.length <= maxLength) {
		return description;
	}

	// Find the last complete sentence or word within the limit
	const truncated = description.substring(0, maxLength);
	const lastSentence = truncated.lastIndexOf(".");
	const lastSpace = truncated.lastIndexOf(" ");

	if (lastSentence > maxLength - 20) {
		return description.substring(0, lastSentence + 1);
	}

	if (lastSpace > maxLength - 10) {
		return description.substring(0, lastSpace) + "...";
	}

	return truncated + "...";
}

/**
 * Generates keywords string from array
 */
export function generateKeywords(keywords: string[]): string {
	return keywords.join(", ");
}

/**
 * Creates enhanced blog post description for SEO
 */
export function enhanceBlogDescription(
	description: string,
	tags?: string[],
): string {
	let enhanced = truncateDescription(description);

	// If description is very short, add context about the blog
	if (enhanced.length < 120 && tags && tags.length > 0) {
		const mainTags = tags.slice(0, 2);
		enhanced += ` Learn about ${mainTags.join(" and ")} on t128n.`;
	}

	return enhanced;
}

/**
 * Extracts reading time from remark plugin frontmatter
 */
export function extractReadingTime(remarkPluginFrontmatter: any): number {
	return remarkPluginFrontmatter?.readingTime?.minutes || 0;
}

/**
 * Calculates word count from content
 */
export function calculateWordCount(content: string): number {
	return content.trim().split(/\s+/).length;
}
