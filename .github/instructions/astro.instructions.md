---
description: Astro project rules for strictness, semantics, and structure.
applyTo: '**/*.astro'
---

- Use strict TypeScript.
- Write semantic, accessible HTML.
- Keep file structure consistent.
- Make components modular and reusable; one responsibility each.
- Prefer semantic HTML. Use data attributes only for state or behavior (e.g., data-featured, data-active), not for purely styling purposes. Use classnames for styling-only hooks; avoid data-xyz for presentation-only selectors.
- When documentation or conventions are unclear, the AI agent must either query the official Astro documentation or use the provided Model Context Protocol (MCP) to obtain authoritative information about Astro conventions and best practices.
- When there is a conflict between Astro conventions and project-specific conventions, always weight Astro conventions higher and follow them unless explicitly instructed otherwise.