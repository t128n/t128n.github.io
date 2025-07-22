# TODO.md

## JSON-LD Structured Data Setup

6. JSON-LD Structured Data  

Place inside `<script type="application/ld+json">…</script>` in `<head>`.

a) Organization + WebSite (with search)  
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#org",
      "name": "Your Company, Inc.",
      "url": "https://example.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/yourpage",
        "https://twitter.com/yourhandle"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "YourSiteName",
      "publisher": {
        "@id": "https://example.com/#org"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://example.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

b) BreadcrumbList  
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Category",
      "item": "https://example.com/category/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Current Page",
      "item": "https://example.com/category/page/"
    }
  ]
}
```

c) Article / BlogPosting (for blog posts)  
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Your Article Title",
  "image": ["https://example.com/image1.jpg"],
  "datePublished": "2025-07-20T08:00:00+00:00",
  "dateModified": "2025-07-21T09:20:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company, Inc.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "description": "Brief summary of the article."
}
```

d) FAQPage (for Q&A sections)  
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can return items within 30 days…"
      }
    },
    {
      "@type": "Question",
      "name": "Do you ship internationally?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we ship to over 50 countries…"
      }
    }
  ]
}
```

e) Optional extras (if relevant):  
• Event, Product, LocalBusiness, HowTo, VideoObject, Recipe  