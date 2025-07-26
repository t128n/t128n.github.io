# Torben Haack [t128n]

Welcome to the source code for [t128n.github.io](https://t128n.github.io), the digital home of Torben Haack. This project is a modern, minimal, and highly maintainable Astro site built for sharing knowledge, technical writing, and open-source projects.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/t128n/t128n.github.io.git
cd t128n.github.io

# Install dependencies (using Bun)
bun install

# Start development server
bun dev

# Build for production
bun build
```

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build) — static-first, fast, and accessible by default
- **Package Manager:** [Bun](https://bun.sh) — blazing-fast JS runtime and package manager
- **Content:** Markdown/MDX for blog posts, modular Astro components for UI
- **Styling:** Custom CSS with CSS variables for theming
- **Code Quality:** [Biome](https://biomejs.dev) for formatting and linting
- **Deployment:** GitHub Actions → GitHub Pages

## 📁 Project Structure

```
t128n/
├── src/
│   ├── pages/          # File-based routing for pages and blog
│   ├── components/     # Reusable, single-responsibility UI components
│   ├── layouts/        # Page layouts and templates
│   ├── lib/            # Utility functions and helpers
│   └── assets/         # Static assets (images, fonts)
├── content/
│   ├── blog/           # All blog posts and long-form writing
│   └── feed/           # Micro-blog entries
├── public/             # Static files served directly
└── .github/            # GitHub Actions and project instructions
```

## 🏗️ Development

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Available Scripts

```bash
bun dev          # Start development server (localhost:4321)
bun build        # Build for production
bun preview      # Preview production build
bun format       # Format code with Biome
bun lint         # Lint code with Biome
bun check        # Format and lint with auto-fix
bun type-check   # Run TypeScript type checking
bun clean        # Remove build artifacts
```

## 🚀 Deployment

The site is automatically deployed via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Deployed to GitHub Pages at `https://t128n.github.io`

---

## 👨‍💻 About Torben Haack

Hi, I'm Torben; a software engineer passionate about building, learning, and sharing knowledge.

- **Background:** Grew up in Schleswig-Holstein, Germany. Started with Minecraft servers and plugins, which sparked a lifelong curiosity for how things work.
- **Current:** Working as a professional Software Engineer.
- **Philosophy:** Software is about creating order from chaos, expressing ideas through structure, and building things that last. I believe in minimalism, iteration, and sharing what I learn.
- **Teaching:** Led workshops on Git and best practices, mentored apprentices, and advocate for open, accessible knowledge.

### Notable Projects

- **MYP (Manage Your Printer):** Enterprise printer management (Next.js, TypeScript)
- **PromptLab:** Modular prompt engineering tool (React, Radix UI, Tailwind CSS)
- **Warp-Themes:** Theme builder for Warp Terminal & VS Code
- **HAFAS Station Monitor:** Public transit dashboard
- Countless experiments, plugins, and web tools

When I'm not coding, you'll find me reading, writing, working out, or exploring new ideas. If you find inspiration or guidance here, that's all I could hope for.

---

## 📞 Contact & Links

- 🌐 [Website](https://t128n.github.io)
- 💼 [LinkedIn](https://www.linkedin.com/in/torben-haack/)
- 🐙 [GitHub](https://github.com/t128n)
- 📧 [Email](mailto:t128n@ipv4.8shield.net)