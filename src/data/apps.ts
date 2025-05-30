import { AsciiApp } from "@/components/apps/ascii";
import { ScratchpadApp } from "@/components/apps/scratchpad";
import { SnippetsApp } from "@/components/apps/snippets";
import { NewsApp } from "@/components/apps/news";
import { EngineeringHandbookApp } from "@/components/apps/engineering-handbook";

type BaseApp = {
	name: string;
	description: string;
	tags: string[];
};

type InternalApp = BaseApp & {
	component: typeof AsciiApp | typeof ScratchpadApp | typeof SnippetsApp | typeof NewsApp | typeof EngineeringHandbookApp;
};

type ExternalApp = BaseApp & {
	url: string;
	external: true;
};

type App = InternalApp | ExternalApp;

export const apps: Record<string, App> = {
	routr: {
		name: "Routr",
		description:
			"A simple, minimalistic search engine router. Like DuckDuckGo Bangs, but local. And fast.",
		url: "https://t128n.github.io/routr/",
		external: true,
		tags: ["search", "productivity"],
	},
	ascii: {
		name: "ASCII Visualizer",
		description:
			"Real-time ASCII text processing and visualization with statistics, color-coded highlights, and interactive tooltips.",
		component: AsciiApp,
		tags: ["text", "visualization"],
	},
	scratchpad: {
		name: "Scratchpad",
		description: "A minimal scratchpad for focused writing.",
		component: ScratchpadApp,
		tags: ["writing", "productivity"],
	},
	snippets: {
		name: "Snippets",
		description: "A simple snippets manager.",
		component: SnippetsApp,
		tags: ["code", "productivity"],
	},
	news: {
		name: "News",
		description: "A simple RSS feed reader with fuzzy search and local storage.",
		component: NewsApp,
		tags: ["news", "productivity"],
	},
	"engineering-handbook": {
		name: "The Engineering Handbook",
		description: "A collection of engineering insights, principles, and best practices with powerful search and filtering.",
		component: EngineeringHandbookApp,
		tags: ["engineering", "learning", "reference"],
	},
} as const;

export type AppSlug = keyof typeof apps; 