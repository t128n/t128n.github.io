# JSON-LD Structured Data Implementation Specs

## Overview
This document specifies how to implement JSON-LD structured data for SEO and rich results on the t128n Astro project. The focus is on three types: Organization + WebSite, BreadcrumbList, and BlogPosting.

---


## 1. Organization + WebSite (with SearchAction)

### Where
- Injected into the `<head>` of all pages (global, e.g., in `root-layout.astro`).

### Data Sources
- Organization name: `Torben Haack`
- Site URL: from Astro config (`Astro.site`)
- Logo: `/assets/avatar.webp`
- Social links:
  - Twitter: https://twitter.com/_t128n
  - GitHub: https://github.com/t128n
  - LinkedIn: https://www.linkedin.com/in/torben-haack
- WebSite name: `t128n`
- SearchAction: `/search?q={search_term_string}`

### Example
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://t128n.github.io/#org",
      "name": "Torben Haack",
      "url": "https://t128n.github.io/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://t128n.github.io/assets/avatar.webp"
      },
      "sameAs": [
        "https://github.com/t128n",
        "https://twitter.com/_t128n",
        "https://www.linkedin.com/in/torben-haack"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://t128n.github.io/#website",
      "url": "https://t128n.github.io/",
      "name": "t128n",
      "publisher": {
        "@id": "https://t128n.github.io/#org"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://t128n.github.io/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>
```

---


## 2. BreadcrumbList

### Where
- Injected into the `<head>` of all pages with a hierarchy (e.g., blog posts, writings, apps).
- Dynamically generate based on the current route and page context.

### Data Sources
- Page path and titles: from Astro page props or content frontmatter.
- URLs: constructed from the site base URL and route (use `Astro.site`).

### Example (for a blog post)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://t128n.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://t128n.github.io/blog/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Current Post Title",
      "item": "https://t128n.github.io/blog/current-post/"
    }
  ]
}
</script>
```

---


## 3. BlogPosting

### Where
- Injected into the `<head>` of individual blog post pages (`/blog/[slug].astro`).

### Data Sources
- Title, image, datePublished, dateModified, description: from blog post frontmatter.
- Author: `Torben Haack`
- Publisher: same as Organization above.

### Example
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Optimize Search Performance",
  "image": ["https://t128n.github.io/assets/cover-image.webp"],
  "datePublished": "2025-05-02T08:00:00+00:00",
  "dateModified": "2025-05-02T08:00:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Torben Haack"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Torben Haack",
    "logo": {
      "@type": "ImageObject",
      "url": "https://t128n.github.io/assets/avatar.webp"
    }
  },
  "description": "A guide to optimizing search performance in web applications."
}
</script>
```

---

## Implementation Notes
- Use Astro's `set:head` or layout components to inject the JSON-LD.
- Escape JSON safely for HTML.
- Use `Astro.site` for all absolute URLs.
- Use `/assets/avatar.webp` for logo.
- Use provided social links and author name.
- Dynamically generate BreadcrumbList and BlogPosting data per page.
- Use frontmatter for blog post metadata; fallback to layout/about defaults if missing.
- Validate output with Google's Rich Results Test.
