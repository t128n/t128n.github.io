

# Copilot Instructions for t128n Astro Project

## 1. Project Structure & Conventions

- Astro project managed with Bun. Pages in `src/pages/` (`.astro`/`.md`) are routes. Components in `src/components/`, layouts in `src/layouts/`, static assets in `public/` and `src/assets/`.
- Use semantic, accessible HTML in `.astro` files. File-based routing: each `.astro`/`.md` in `src/pages/` is a route.
- Use constants for magic numbers and repeated values (see `/src`).
- Organize code for clarity and maintainability. Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## 2. Build & Development

- Use Bun for all scripts:
  - `bun install` — install dependencies
  - `bun dev` — start dev server (localhost:4321)
  - `bun build` — build to `./dist/`
  - `bun preview` — preview production build
  - `bun astro ...` — run Astro CLI commands (e.g., `bun astro add`)
- Add dependencies via `bun add <package>`. No custom test or lint scripts by default.

## 3. AI Agent Guidance & Instruction Discovery

- **Always check and follow rules in `.github/instructions/` before making or suggesting code changes.**
  - Includes: `astro.instructions.md`, `clean-code.instructions.md`, `code-quality.instructions.md`, etc.
- Adhere to project-specific instructions for Astro code. Data attributes (e.g., `data-featured`, `data-active`) are only for state/behavior, not styling. Use class names for styling-only selectors.
- Do not introduce generic advice or patterns not present in this codebase.
- Reference and reuse patterns from existing files (e.g., `src/pages/index.astro`, `src/components/page-header.astro`).
- When in doubt, prefer minimal, idiomatic Astro code.
- Do not update markdown files unless asked.

## 4. Example Patterns

- New pages: add `.astro` files to `src/pages/`.
- New components: add to `src/components/` and import as needed.
- Use `Astro.fetchContent` for dynamic content if required.

## 5. Integration Points

- No external APIs or services integrated by default.

## 6. Advanced Agent Modes & Rules

### Scalability & Maintainability
- Split large files/functions as needed. After writing code, reflect on scalability and maintainability. Provide a brief analysis and suggest improvements or next steps as needed.

### Planner Mode
- When asked to enter "Planner Mode":
  - Reflect on requested changes and analyze existing code to map the full scope.
  - Ask clarifying questions before proposing a plan. Draft a plan and request approval. After each phase, state what was completed and what remains.

### Architecture Mode
- When asked to enter "Architecture Mode":
  - Analyze scale and requirements, considering constraints and performance. Generate a tradeoff analysis of possible designs. Ask clarifying questions before proposing a system design. Revise and seek approval as needed, then implement in phases, reporting progress after each.

### Debugger Mode
- When asked to enter "Debugger Mode":
  - Reflect on possible sources of the problem, distill to likely causes. Add logs to validate assumptions and track data flow before fixing. Use available tools to obtain logs. Reflect on findings and suggest further logs if needed. After a fix, ask for approval to remove added logs.

### Sanitation & Coding Rules
- Never write a JavaScript/TypeScript IIFE. Never create a barrel file to export modules. Always use a block body with an explicit return statement for arrow functions. Never define props inline with the component declaration; create a Props interface above the component.

---

For further details, see the [Astro docs](https://docs.astro.build) and all project instruction files in `.github/instructions/`.
