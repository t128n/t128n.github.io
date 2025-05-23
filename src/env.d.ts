interface Window {
	plausible: ((...args: unknown[]) => void) & { q: Array<unknown> };
} 