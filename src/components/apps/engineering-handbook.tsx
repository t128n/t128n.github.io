import { useEffect, useState, useRef } from "react";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import { insights } from "@/data/engineering-handbook";
import type { Insight } from "@/data/engineering-handbook";

interface HighlightedInsight extends Insight {
  titleMatches: [number, number][];
  contentMatches: [number, number][];
  categoryMatches: [number, number][];
  tagMatches: [number, number][];
}

// Header Component
function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-8 flex flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold font-mono">
          Engineering Handbook
        </h1>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">/</kbd> search
          <span className="mx-2">·</span>
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">Esc</kbd> clear filters
        </div>
      </div>
    </header>
  );
}

// SearchBar Component
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

function SearchBar({ searchQuery, setSearchQuery, searchInputRef }: SearchBarProps) {
  return (
    <div className="mb-8 relative">
      <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search insights... (/)"className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

// ActiveFilters Component
interface ActiveFiltersProps {
  selectedCategory: string | null;
  selectedTag: string | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
}

function ActiveFilters({ selectedCategory, selectedTag, setSelectedCategory, setSelectedTag }: ActiveFiltersProps) {
  if (!selectedCategory && !selectedTag) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {selectedCategory && (
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2">
          Category: {selectedCategory}
          <button
            onClick={() => setSelectedCategory(null)}
            className="hover:text-blue-900 dark:hover:text-blue-100"
          >
            ×
          </button>
        </span>
      )}
      {selectedTag && (
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2">
          Tag: {selectedTag}
          <button
            onClick={() => setSelectedTag(null)}
            className="hover:text-blue-900 dark:hover:text-blue-100"
          >
            ×
          </button>
        </span>
      )}
    </div>
  );
}

// Sidebar Component
interface SidebarProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTag: string | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
}

function Sidebar({ categories, tags, selectedCategory, selectedTag, setSelectedCategory, setSelectedTag }: SidebarProps) {
  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="space-y-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`w-full p-2 text-left rounded-md transition-colors ${
                selectedCategory === category
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2 py-1 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// InsightCard Component
interface InsightCardProps {
  insight: HighlightedInsight;
}

function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
        <h2 className="text-lg sm:text-xl font-bold">
          <Highlight text={insight.title} ranges={insight.titleMatches} />
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
            <Highlight text={insight.category} ranges={insight.categoryMatches} />
          </span>
          {insight.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none prose-sm">
        <Highlight text={insight.content} ranges={insight.contentMatches} />
      </div>
      {insight.source && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Source: {insight.source}
        </div>
      )}
    </article>
  );
}

// LandingPage Component
interface LandingPageProps {
  insight: Insight;
}

function LandingPage({ insight }: LandingPageProps) {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-4">
      <div className="max-w-[120ch] w-full">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-2xl sm:text-3xl font-serif leading-relaxed text-stone-800 dark:text-stone-200 mb-12">
            {insight.content}
          </p>
          <footer className="flex flex-col gap-4 border-t border-stone-200 dark:border-stone-700 pt-6">
            <div>
              <cite className="text-lg font-serif not-italic text-stone-700 dark:text-stone-300">
                {insight.title}
              </cite>
              {insight.source && (
                <div className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Source: {insight.source}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-stone-100 dark:bg-stone-700 rounded-full text-stone-600 dark:text-stone-300">
                {insight.category}
              </span>
              {insight.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-stone-100 dark:bg-stone-700 rounded-full text-stone-600 dark:text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </div>
        <div className="text-center mt-8">
          <a
            href="/apps/engineering"
            className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            View all insights →
          </a>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export function EngineeringHandbookApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [randomInsight, setRandomInsight] = useState<Insight | null>(null);

  // Check for landing page parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const landingPage = params.get('landingpage');
    if (landingPage) {
      setIsLandingPage(true);
      const randomIndex = Math.floor(Math.random() * insights.length);
      setRandomInsight(insights[randomIndex]);
    }
  }, []);

  // Get unique categories and tags
  const categories = Array.from(new Set(insights.map(insight => insight.category)));
  const tags = Array.from(new Set(insights.flatMap(insight => insight.tags)));

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSearchFocused = document.activeElement === searchInputRef.current;
      
      if (e.key === "/" && !isSearchFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setSelectedCategory(null);
        setSelectedTag(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter and search insights
  const filteredInsights = useFuzzySearchList({
    list: insights.filter(insight => 
      (!selectedCategory || insight.category === selectedCategory) &&
      (!selectedTag || insight.tags.includes(selectedTag))
    ),
    queryText: searchQuery,
    getText: (item) => [item.title, item.content, item.category, item.tags.join(" ")],
    mapResultItem: ({ item, matches: [titleMatches, contentMatches, categoryMatches, tagMatches] }) => ({
      ...item,
      titleMatches,
      contentMatches,
      categoryMatches,
      tagMatches
    })
  }) as HighlightedInsight[];

  // Landing page view
  if (isLandingPage && randomInsight) {
    return <LandingPage insight={randomInsight} />;
  }

  // Regular app view
  return (
    <div className="w-dvw h-dvh flex flex-col font-mono bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-1 overflow-hidden flex">
        <Sidebar
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          setSelectedCategory={setSelectedCategory}
          setSelectedTag={setSelectedTag}
        />
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchInputRef={searchInputRef}
            />
            <ActiveFilters
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              setSelectedCategory={setSelectedCategory}
              setSelectedTag={setSelectedTag}
            />
            <div className="space-y-6">
              {filteredInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 