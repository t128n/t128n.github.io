
# Copilot Instructions for t128n Astro Project

## 1. Project Structure & Conventions

- Astro minimal starter, managed with Bun.
- Pages: `src/pages/` (`.astro`/`.md`), each file = route.
- Components: `src/components/` (Astro, React, etc.).
- Layouts: `src/layouts/`.
- Static assets: `public/`, `src/assets/`.
- Use semantic HTML and accessible markup in `.astro` files.
- File-based routing: each `.astro`/`.md` in `src/pages/` is a route.
- Shared UI in `src/components/`, layouts in `src/layouts/`.
- Use constants for magic numbers and repeated values (see `/src`).
- Organize code for clarity and maintainability.
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## 2. Build & Development

- Use Bun for all scripts:
  - `bun install` — install dependencies
  - `bun dev` — start dev server (localhost:4321)
  - `bun build` — build to `./dist/`
  - `bun preview` — preview production build
  - `bun astro ...` — run Astro CLI commands (e.g., `bun astro add`)
- No custom test or lint scripts by default.
- Add new dependencies via `bun add <package>`.

## 3. AI Agent Guidance & Instruction Discovery

- **Always check for and follow rules in the `.github/instructions/` directory before making or suggesting any code changes.**
  - This includes, but is not limited to: `astro.instructions.md`, `clean-code.instructions.md`, `code-quality.instructions.md`.
- Adhere to project-specific instructions for Astro code.
  - Data attributes (e.g., data-featured, data-active) should only be used for state or behavior, not for purely styling purposes. For styling-only selectors, use class names instead. Avoid data-xyz for presentation-only hooks.
- Do not introduce generic advice or patterns not present in this codebase.
- Reference and reuse patterns from existing files (e.g., `src/pages/index.astro`, `src/components/page-header.astro`).
- When in doubt, prefer minimal, idiomatic Astro code.
- If provided markdown files, use them as reference for code structure. Do not update markdown files unless asked.

## 4. Example Patterns

- New pages: add `.astro` files to `src/pages/`.
- New components: add to `src/components/` and import as needed.
- Use `Astro.fetchContent` for dynamic content if required.

## 5. Integration Points

- No external APIs or services integrated by default.

## 6. Advanced Agent Modes & Rules

### Scalability & Maintainability
- Split large files/functions as needed.
- After writing code, reflect on scalability and maintainability. Provide a 1-2 paragraph analysis and suggest improvements or next steps as needed.

### Planner Mode
- When asked to enter "Planner Mode":
  - Deeply reflect on the requested changes and analyze existing code to map the full scope.
  - Ask 4-6 clarifying questions before proposing a plan.
  - Once questions are answered, draft a comprehensive plan and request approval.
  - After each phase, state what was completed and what remains.

### Architecture Mode
- When asked to enter "Architecture Mode":
  - Analyze the scale and requirements, considering constraints and performance.
  - Generate a 5-paragraph tradeoff analysis of possible designs.
  - Ask 4-6 clarifying questions before proposing a system design.
  - Revise and seek approval as needed, then implement in phases, reporting progress after each.

### Debugger Mode
- When asked to enter "Debugger Mode":
  - Reflect on 5-7 possible sources of the problem, distill to 1-2 likely causes.
  - Add logs to validate assumptions and track data flow before fixing.
  - Use available tools to obtain logs; if not installed, guide user to install Browser Tools MCP.
  - Reflect on findings and suggest further logs if needed.
  - After a fix, ask for approval to remove added logs.

### Sanitation & Coding Rules
- Never write a JavaScript or TypeScript IIFE.
- Never create a barrel file to export modules.
- Always use a block body with an explicit return statement for arrow functions, even for single expressions.
- Never define props inline with the component declaration; create a Props interface above the component.

---

For further details, see the [Astro docs](https://docs.astro.build) and all project instruction files in `.github/instructions/`.
