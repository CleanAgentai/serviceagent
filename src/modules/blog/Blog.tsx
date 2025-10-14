import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { client } from "../../app/lib/sanityClient";
import { POSTS_COUNT_QUERY, POSTS_QUERY, estimateReadTime, type Post } from "@/modules/blog/post";


import { Helmet } from "react-helmet";

import { Calendar, Clock, ArrowRight, User, Sparkles, Zap, TrendingUp, BookOpen, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from "../landing/components/Navigation";

import { motion } from 'framer-motion';


export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = currentPage === 0 ? 7 : 6; // First page: 1 featured + 6 grid, Other pages: 6 grid


  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [postsData, count] = await Promise.all([
          client.fetch<Post[]>(POSTS_QUERY(currentPage, postsPerPage)),
          client.fetch<number>(POSTS_COUNT_QUERY)
        ]);
        if (alive) {
          setPosts(postsData);
          setTotalPosts(count);
        }
      } catch (e: any) {
        if (alive) setErr(e?.message ?? 'Failed to load posts');
      }
    })();
    return () => { alive = false; };
  }, [currentPage]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (err) return <div className="p-6 text-red-500">Error: {err}</div>;
  if (!posts) return <div className="p-6">Loading…</div>;

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Blog | ServiceAgent – No posts yet</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Navigation />
        <div className="min-h-screen mt-16 flex items-center justify-center bg-background px-6">
          <Card className="max-w-xl w-full text-center border-dashed">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mt-4">No articles yet</h2>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Our team is writing the first posts. Check back soon for AI hiring insights, product updates, and case studies.
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // With the updated query, featured posts are prioritized on page 0
  const featured = posts.filter(p => p.featured);
  const latestFeatured = featured.length > 0 ? [featured[0]] : posts.length > 0 ? [posts[0]] : [];
  const rest = featured.length > 0 
    ? posts.filter(p => !p.featured)
    : posts.length > 0 
      ? posts.slice(1) 
      : [];
      

    const totalPages = totalPosts <= 7 ? 1 : 1 + Math.ceil((totalPosts - 7) / 6);
    const hasNextPage = currentPage < totalPages - 1;
    const hasPrevPage = currentPage > 0;
    // SEO structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "ServiceAgent Blog",
      "description": "AI hiring insights, product updates, and case studies for service businesses",
      "url": "https://fsagent.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "ServiceAgent",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fsagent.com/logo.svg"
        }
      },
      "blogPost": posts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.image,
        "datePublished": post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "url": `https://fsagent.com/blog/${post.slug}`
      }))
    };

    return (
      <>
        <Helmet>
          {/* SEO Meta Tags */}
          <title>Blog | ServiceAgent – AI Hiring Insights & Resources</title>
          <meta 
            name="description" 
            content="Explore ServiceAgent's blog for AI hiring tips, product updates, and case studies to help service businesses hire faster and smarter." 
          />
          <meta name="keywords" content="AI hiring, automated interviews, service industry recruitment, hiring technology, candidate scoring" />
          <meta property="og:title" content="Blog | ServiceAgent – AI Hiring Insights & Resources" />
          <meta property="og:description" content="Explore ServiceAgent's blog for AI hiring tips, product updates, and case studies to help service businesses hire faster and smarter." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Helmet>
  
        <Navigation />
        
        <div className="min-h-screen mt-16 bg-background">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-muted/30">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              
              {/* Floating particles */}
              <div className="absolute top-32 left-16 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-40 right-20 w-1 h-1 bg-gold/40 rounded-full animate-bounce" style={{ animationDelay: '1.2s' }} />
              <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-teal/30 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }} />
              <div className="absolute bottom-48 right-16 w-2 h-2 bg-terracotta/20 rounded-full animate-bounce" style={{ animationDelay: '1.8s' }} />
            </div>
            
            <div className="container mx-auto px-6 relative">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex"
                >
                  <Badge variant="outline" className="px-6 py-2 text-sm font-medium border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                    <BookOpen className="w-4 h-4 mr-2" />
                    AI Hiring Insights & Resources
                  </Badge>
                </motion.div>
  
                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl md:text-6xl text-foreground font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text leading-tight">
                    Blog
                  </h1>
                  
                  {/* Animated underline */}
                  <div className="flex justify-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-terracotta via-gold to-teal rounded-full animate-pulse" />
                  </div>
                </motion.div>
  
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                  Discover insights, tips, and case studies to help service businesses 
               
                </motion.p>
  
                
              </div>
            </div>
            
            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
          </section>
            
          {/* Featured Post */}
          {latestFeatured && latestFeatured.map((post, index) => (
            <motion.section 
              key={post._id} 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-16 border-b border-border/30"
            >
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-gold/10 border-primary/30 text-primary font-semibold px-4 py-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Featured Article
                    </Badge>
                  </motion.div>
                  
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 group">
                          <Calendar className="w-4 h-4 group-hover:text-primary transition-colors" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                          <Clock className="w-4 h-4 group-hover:text-gold transition-colors" />
                          <span>{estimateReadTime(post.bodyText)}</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                          <User className="w-4 h-4 group-hover:text-teal transition-colors" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                      title={post.title}>
                        {post.title}
                      </h2>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-gold hover:to-gold/80 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-gold/40 transition-all duration-300 hover:scale-105"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                    
                    <motion.div 
                      className="relative group"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-300" />
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="relative w-full h-80 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
  
          {/* All Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-foreground mb-4 text-center"
                >
                  Latest Articles
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
                >
                  Stay updated with the latest trends, strategies, and insights in AI-powered hiring.
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest && rest.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    ><Link to={`/blog/${post.slug}`} className="block">
                      <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm hover:bg-card/80 min-h-full flex flex-col flex-grow">
                        <CardHeader className="p-0">
                          <div className="relative overflow-hidden rounded-t-lg">
                            
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full !h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4">
                              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-primary/20 text-primary font-medium">
                                {post.categoryTitle} 
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        
                        
                        <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1 group/date">
                              <Calendar className="w-3 h-3 group-hover/date:text-primary transition-colors" />
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1 group/time">
                              <Clock className="w-3 h-3 group-hover/time:text-gold transition-colors" />
                              <span>{estimateReadTime(post.bodyText)}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                          title={post.title}>
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
                            {post.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                            <User className="w-3 h-3" />
                            <span>by {post.author}</span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-6 pt-0">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-primary hover:text-gold font-semibold text-sm transition-all duration-300 group/link hover:scale-105"
                          >
                            Read More
                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </CardFooter>
                      </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
  
          {/* Pagination */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-8 border-t border-border/30"
          >
            <div className="container mx-auto px-6">
              <div className="flex justify-center items-center gap-4">
                <Button 
                  disabled={!hasPrevPage}
                  variant="outline"
                  className={`px-6 py-2 text-sm border-border ${!hasPrevPage ? 'text-muted-foreground cursor-not-allowed opacity-50' : 'text-primary hover:border-white hover:bg-blue-600 transition-all duration-300'}`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button className="px-6 py-2 text-sm bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-lg shadow-lg shadow-primary/30">
                  {currentPage + 1} of {totalPages}
                </Button>
                <Button 
                  variant="outline"
                  className={`px-6 py-2 text-sm border-border ${!hasNextPage ? 'text-muted-foreground cursor-not-allowed opacity-50' : 'text-primary hover:border-white hover:bg-blue-600 transition-all duration-300'}`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </>
    );
  };
  
  export default Blog;


  const blogPosts = [
    {
      id: 'ai-hiring-revolution-2025',
      title: 'The AI Hiring Revolution: How Technology is Transforming Service Industry Recruitment',
      excerpt: 'Discover how AI-powered hiring platforms are helping service businesses reduce time-to-hire by 75% while improving candidate quality.',
      date: '2025-01-15',
      author: 'Sarah Johnson',
      readTime: '8 min read',
      image: '/blog/ai-efficiency.jpg',
      category: 'AI Hiring',
      featured: true
    },
    {
      id: 'automated-interviews-guide',
      title: 'Complete Guide to Automated Interviews: Best Practices for Service Businesses',
      excerpt: 'Learn how to implement automated interviews that candidates love while maintaining the human touch your business needs.',
      date: '2025-01-10',
      author: 'Michael Chen',
      readTime: '6 min read',
      image: '/blog/hiring.jpg',
      category: 'Best Practices'
    },
    {
      id: 'candidate-scoring-systems',
      title: 'Building Effective Candidate Scoring Systems: Data-Driven Hiring Decisions',
      excerpt: 'Explore how modern scoring algorithms help identify top talent while eliminating unconscious bias in the hiring process.',
      date: '2025-01-05',
      author: 'Emma Rodriguez',
      readTime: '7 min read',
      image: '/blog/ai-efficiency.jpg',
      category: 'Analytics'
    },
    {
      id: 'service-industry-hiring-trends',
      title: '2025 Service Industry Hiring Trends: What Business Owners Need to Know',
      excerpt: 'Stay ahead of the curve with insights into emerging hiring trends, wage expectations, and talent acquisition strategies.',
      date: '2024-12-28',
      author: 'David Park',
      readTime: '9 min read',
      image: '/blog/hiring.jpg',
      category: 'Industry Trends'
    },
    {
      id: 'roi-automated-hiring',
      title: 'Calculating ROI on Automated Hiring: Real Numbers from Service Businesses',
      excerpt: 'See actual case studies showing how ServiceAgent customers achieved 300% ROI through automated hiring processes.',
      date: '2024-12-20',
      author: 'Lisa Thompson',
      readTime: '5 min read',
      image: '/blog/ai-efficiency.jpg',
      category: 'Case Studies'
    },
    {
      id: 'interview-questions-guide',
      title: 'The Ultimate Guide to Service Industry Interview Questions',
      excerpt: 'Download our comprehensive list of proven interview questions designed specifically for service industry roles.',
      date: '2024-12-15',
      author: 'Robert Kim',
      readTime: '10 min read',
      image: '/blog/hiring.jpg',
      category: 'Resources'
    }
  ];