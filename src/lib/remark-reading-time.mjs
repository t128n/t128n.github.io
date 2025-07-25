import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = mdastToString(tree);
		const readingTime = getReadingTime(textOnPage);

		if (!data) return;
		if (!data.astro) data.astro = {};
		if (!data.astro.frontmatter) data.astro.frontmatter = {};

		data.astro.frontmatter.reading = {
			minutes: readingTime.minutes,
			text: readingTime.text,
		};
	};
}
