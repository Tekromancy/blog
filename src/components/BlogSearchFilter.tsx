import React, { useState, useMemo, useEffect } from "react";

export interface SerializedPost {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  author: string;
  heroImageSrc?: string;
}

interface Props {
  posts: SerializedPost[];
  allTags: string[];
}

export default function BlogSearchFilter({ posts, allTags }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  // Read initial tag from URL if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlTag = params.get("tag");
      const urlQuery = params.get("q");
      if (urlTag && (allTags.includes(urlTag) || urlTag === "all")) {
        setSelectedTag(urlTag);
      }
      if (urlQuery) {
        setSearchQuery(urlQuery);
      }
    }
  }, [allTags]);

  // Sync state to URL without reloading
  const updateUrl = (tag: string, query: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tag && tag !== "all") {
        url.searchParams.set("tag", tag);
      } else {
        url.searchParams.delete("tag");
      }
      if (query.trim()) {
        url.searchParams.set("q", query.trim());
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    updateUrl(tag, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateUrl(selectedTag, val);
  };

  // Keyboard shortcut Ctrl+K / '/' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT") || (e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) {
        e.preventDefault();
        const input = document.getElementById("blog-search-input");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Tag frequency counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      p.tags?.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "all" || (post.tags && post.tags.includes(selectedTag));
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Terminal-themed search prompt */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center rounded-xl border border-white/10 bg-black/80 px-4 py-2.5 shadow-2xl focus-within:border-[#22EE44] focus-within:ring-1 focus-within:ring-[#22EE44] transition-all">
          <span className="font-mono text-xs sm:text-sm text-[#22EE44] select-none mr-2 font-bold shrink-0">
            root@tekromancy:~$
          </span>
          <input
            id="blog-search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="grep -i dispatches, kernel, ebpf, cuda, tags..."
            className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
            aria-label="Search dispatches"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                updateUrl(selectedTag, "");
              }}
              className="font-mono text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded ml-2"
              title="Clear search"
            >
              ESC
            </button>
          )}
          <span className="hidden sm:inline-block font-mono text-[10px] text-gray-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded select-none shrink-0 ml-2">
            /
          </span>
        </div>
      </div>

      <!-- Tag Filter Matrix -->
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto">
        <button
          onClick={() => handleTagClick("all")}
          className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
            selectedTag === "all"
              ? "bg-[#22c55e] text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          #all ({posts.length})
        </button>

        {allTags.map((tag) => {
          const count = tagCounts[tag] || 0;
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                isSelected
                  ? "bg-[#22c55e] text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              #{tag} ({count})
            </button>
          );
        })}
      </div>

      <!-- Live Search / Counter Status -->
      <div className="text-center font-mono text-xs text-gray-400">
        FOUND <span className="text-[#22EE44] font-bold">{filteredPosts.length}</span> DISPATCHES
        {selectedTag !== "all" && <span> IN CATEGORY <span className="text-white font-bold">#{selectedTag}</span></span>}
        {searchQuery && <span> MATCHING VECTOR <span className="text-white font-bold">"{searchQuery}"</span></span>}
      </div>

      <!-- Articles Grid -->
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-black/40 max-w-2xl mx-auto font-mono space-y-3">
          <div className="text-3xl">⚠️</div>
          <div className="text-sm font-bold text-red-400">
            NO DISPATCHES FOUND MATCHING QUERY VECTOR
          </div>
          <p className="text-xs text-gray-400">
            Try resetting your search query or switching to another category tag.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("all");
              updateUrl("all", "");
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#22c55e] text-black hover:bg-[#22c55e]/90 transition-all mt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-white/10 bg-black/60 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#22c55e]/50 hover:shadow-xl group"
            >
              {post.heroImageSrc && (
                <div className="relative aspect-video overflow-hidden border-b border-white/10">
                  <img
                    src={post.heroImageSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  {post.tags?.[0] && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 border border-[#22c55e]/50 text-[#22EE44]">
                      #{post.tags[0]}
                    </span>
                  )}
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-gray-400 mb-2">
                    {post.pubDate} • By {post.author}
                  </div>
                  <h2 className="text-lg font-bold font-mono text-white group-hover:text-[#22EE44] transition-colors leading-snug mb-2">
                    <a href={`/blog/${post.id}`}>{post.title}</a>
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {post.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] font-mono text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-xs font-mono font-bold text-[#22EE44] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
