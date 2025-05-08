import { useEffect, useState, useRef } from "react";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";

interface Feed {
  id: string;
  name: string;
  url: string;
}

interface FeedItem {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  feedId: string;
  feedName: string;
}

interface HighlightedItem extends FeedItem {
  titleMatches: [number, number][];
  descMatches: [number, number][];
  feedMatches: [number, number][];
}

const STORAGE_KEY = "news-feeds";

// Header Component
function Header({ isAddingFeed }: { isAddingFeed: boolean }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-8 flex flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          id="sidebar-toggle"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors sm:hidden"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold font-mono">
          t128n/news
        </h1>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">/</kbd> search
          <span className="mx-2">·</span>
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">n</kbd> new feed
          <span className="mx-2">·</span>
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">Esc</kbd> close
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar({
  feeds,
  selectedFeed,
  onFeedSelect,
  onDeleteFeed,
  onAddFeedClick,
  isOpen,
  onToggle
}: {
  feeds: Feed[];
  selectedFeed: string | null;
  onFeedSelect: (id: string) => void;
  onDeleteFeed: (id: string) => void;
  onAddFeedClick: () => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id="sidebar"
      className={`fixed sm:relative inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 flex flex-col`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Feeds</h2>
        <button
          onClick={onAddFeedClick}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Add new feed (n)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto flex-1">
        {feeds.map(feed => (
          <button
            key={feed.id}
            onClick={() => onFeedSelect(feed.id)}
            className={`w-full p-2 text-left rounded-md transition-colors ${
              selectedFeed === feed.id
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="truncate">{feed.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFeed(feed.id);
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// AddFeedModal Component
function AddFeedModal({
  isOpen,
  onClose,
  onSubmit,
  newFeedName,
  newFeedUrl,
  onNameChange,
  onUrlChange
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newFeedName: string;
  newFeedUrl: string;
  onNameChange: (value: string) => void;
  onUrlChange: (value: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Feed</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="feed-name" className="block text-sm font-medium mb-1">Feed Name</label>
            <input
              id="feed-name"
              type="text"
              value={newFeedName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="e.g., TechCrunch"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="feed-url" className="block text-sm font-medium mb-1">Feed URL</label>
            <input
              id="feed-url"
              type="url"
              value={newFeedUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              placeholder="e.g., https://techcrunch.com/feed/"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Feed
          </button>
        </div>
      </form>
    </div>
  );
}

// SearchBar Component
function SearchBar({
  value,
  onChange,
  inputRef
}: {
  value: string;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="mb-8 relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles... (/)"
        className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
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

// FeedItem Component
function FeedItem({ item }: { item: HighlightedItem }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
        <h2 className="text-lg sm:text-xl font-bold">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Highlight text={item.title} ranges={item.titleMatches} />
          </a>
        </h2>
        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full self-start">
          <Highlight text={item.feedName} ranges={item.feedMatches} />
        </span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(item.pubDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </div>
      <div
        className="prose dark:prose-invert max-w-none prose-sm"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    </article>
  );
}

// FeedList Component
function FeedList({ items }: { items: HighlightedItem[] }) {
  return (
    <div className="space-y-6">
      {items.map(item => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// Main NewsApp Component
export function NewsApp() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedName, setNewFeedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingFeed, setIsAddingFeed] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load feeds from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFeeds(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored feeds:", error);
      }
    }
  }, []);

  // Save feeds to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feeds));
  }, [feeds]);

  // Fetch feed items whenever feeds change
  useEffect(() => {
    const fetchFeeds = async () => {
      setIsLoading(true);
      setError(null);
      const newItems: FeedItem[] = [];

      for (const feed of feeds) {
        try {
          const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
          const data = await response.json();
          
          if (data.status === "ok") {
            const items = data.items.map((item: any) => ({
              id: crypto.randomUUID(),
              title: item.title,
              link: item.link,
              description: item.description,
              pubDate: new Date(item.pubDate).toISOString(),
              feedId: feed.id,
              feedName: feed.name
            }));
            newItems.push(...items);
          } else {
            throw new Error(`Failed to fetch feed: ${data.message}`);
          }
        } catch (error) {
          console.error(`Error fetching feed ${feed.name}:`, error);
          setError(`Failed to fetch feed: ${feed.name}`);
        }
      }

      // Sort items by date, newest first
      newItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      setFeedItems(newItems);
      setIsLoading(false);
    };

    if (feeds.length > 0) {
      fetchFeeds();
    }
  }, [feeds]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSearchFocused = document.activeElement === searchInputRef.current;
      
      if (e.key === "/" && !isAddingFeed && !isSearchFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "n" && !isAddingFeed && !isSearchFocused) {
        e.preventDefault();
        setIsAddingFeed(true);
      } else if (e.key === "Escape") {
        setIsAddingFeed(false);
        setSelectedFeed(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddingFeed]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      if (sidebar && sidebarToggle && 
          !sidebar.contains(e.target as Node) && 
          !sidebarToggle.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedUrl.trim() || !newFeedName.trim()) return;

    setFeeds([
      ...feeds,
      {
        id: crypto.randomUUID(),
        name: newFeedName,
        url: newFeedUrl
      }
    ]);

    setNewFeedUrl("");
    setNewFeedName("");
    setIsAddingFeed(false);
  };

  const handleDeleteFeed = (id: string) => {
    setFeeds(feeds.filter(f => f.id !== id));
    setFeedItems(feedItems.filter(item => item.feedId !== id));
    if (selectedFeed === id) {
      setSelectedFeed(null);
    }
  };

  // Filter items based on search query and selected feed
  const filteredItems = useFuzzySearchList({
    list: feedItems.filter(item => !selectedFeed || item.feedId === selectedFeed),
    queryText: searchQuery,
    getText: (item) => [item.title, item.description, item.feedName],
    mapResultItem: ({ item, matches: [titleMatches, descMatches, feedMatches] }) => ({
      ...item,
      titleMatches,
      descMatches,
      feedMatches
    })
  }) as HighlightedItem[];

  return (
    <div className="w-dvw h-dvh flex flex-col font-mono bg-gray-50 dark:bg-gray-900">
      <Header isAddingFeed={isAddingFeed} />
      
      <div className="flex-1 overflow-hidden flex relative">
        <Sidebar
          feeds={feeds}
          selectedFeed={selectedFeed}
          onFeedSelect={(id) => {
            setSelectedFeed(selectedFeed === id ? null : id);
            setIsSidebarOpen(false);
          }}
          onDeleteFeed={handleDeleteFeed}
          onAddFeedClick={() => setIsAddingFeed(true)}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <AddFeedModal
              isOpen={isAddingFeed}
              onClose={() => setIsAddingFeed(false)}
              onSubmit={handleAddFeed}
              newFeedName={newFeedName}
              newFeedUrl={newFeedUrl}
              onNameChange={setNewFeedName}
              onUrlChange={setNewFeedUrl}
            />

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              inputRef={searchInputRef}
            />

            {error && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            <FeedList items={filteredItems} />
          </div>
        </div>
      </div>
    </div>
  );
} 