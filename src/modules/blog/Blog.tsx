import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, Filter } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

// Sample blog posts data (replace with real data)
const blogPosts: BlogPost[] = [
  {
    slug: "maximizing-efficiency-with-ai",
    title: "Maximizing Efficiency with AI: A Guide for Cleaning Businesses",
    excerpt:
      "Discover how artificial intelligence is revolutionizing the cleaning industry and learn practical steps to implement AI in your business operations.",
    date: "February 20, 2025",
    readTime: "5 min read",
    category: "AI & Automation",
    image: "/blog/ai-efficiency.jpg",
    tags: ["AI", "Automation", "Efficiency", "Business Growth"],
  },
  {
    slug: "ai-hiring-strategies",
    title: "AI-Powered Hiring Strategies for Cleaning Businesses",
    excerpt:
      "Learn how to leverage artificial intelligence to streamline your hiring process and find the best talent for your cleaning business.",
    date: "February 18, 2025",
    readTime: "4 min read",
    category: "HR & Recruitment",
    image: "/blog/hiring.jpg",
    tags: ["HR", "Hiring", "AI", "Team Building"],
  },
  {
    slug: "future-of-cleaning-industry",
    title: "The Future of the Cleaning Industry: AI and Automation Trends",
    excerpt:
      "Explore emerging trends in the cleaning industry and how AI is shaping the future of cleaning services and business operations.",
    date: "February 15, 2025",
    readTime: "6 min read",
    category: "Industry Trends",
    image: "/blog/ai-efficiency.jpg",
    tags: ["Industry Trends", "Future", "Technology", "Innovation"],
  },
  {
    slug: "scaling-cleaning-business",
    title: "How to Scale Your Cleaning Business with AI Automation",
    excerpt:
      "A comprehensive guide to using AI automation tools for growing your cleaning business while maintaining quality and customer satisfaction.",
    date: "February 12, 2025",
    readTime: "7 min read",
    category: "Business Growth",
    image: "/blog/hiring.jpg",
    tags: ["Scaling", "Growth", "Automation", "Business Strategy"],
  },
  {
    slug: "customer-satisfaction-ai",
    title: "Improving Customer Satisfaction with AI-Powered Service",
    excerpt:
      "Learn how AI can help you deliver better customer service, handle complaints more effectively, and increase client retention rates.",
    date: "February 10, 2025",
    readTime: "5 min read",
    category: "Customer Service",
    image: "/blog/ai-efficiency.jpg",
    tags: ["Customer Service", "AI", "Client Retention", "Satisfaction"],
  },
  {
    slug: "marketing-automation-cleaning",
    title: "Marketing Automation for Cleaning Businesses: A Complete Guide",
    excerpt:
      "Discover how to automate your marketing efforts to attract more clients, nurture leads, and grow your cleaning business consistently.",
    date: "February 8, 2025",
    readTime: "6 min read",
    category: "Marketing",
    image: "/blog/hiring.jpg",
    tags: ["Marketing", "Automation", "Lead Generation", "Growth"],
  },
];

const categories = [
  "All Categories",
  "AI & Automation",
  "HR & Recruitment",
  "Business Growth",
  "Industry Trends",
  "Best Practices",
];

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Helmet>
        <title>
          ServiceAgent Blog - Insights for Modern Cleaning Businesses
        </title>
        <meta
          name="description"
          content="Expert insights, industry trends, and practical tips for modern cleaning businesses. Learn about AI automation, hiring strategies, and business growth."
        />
        <meta
          property="og:title"
          content="CleanAgent Blog - Insights for Modern Cleaning Businesses"
        />
        <meta
          property="og:description"
          content="Expert insights, industry trends, and practical tips for modern cleaning businesses. Learn about AI automation, hiring strategies, and business growth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanagent.ai/blog" />
        <meta
          property="og:image"
          content="https://cleanagent.ai/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CleanAgent Blog - Insights for Modern Cleaning Businesses"
        />
        <meta
          name="twitter:description"
          content="Expert insights, industry trends, and practical tips for modern cleaning businesses. Learn about AI automation, hiring strategies, and business growth."
        />
        <meta
          name="twitter:image"
          content="https://cleanagent.ai/og-image.jpg"
        />
      </Helmet>

      <div className="mt-16 min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
              ServiceAgent Blog
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Expert insights, industry trends, and practical tips for modern
              cleaning businesses.
            </p>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-auto">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                    <span className="mx-2">·</span>
                    <Clock className="h-4 w-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg border ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
