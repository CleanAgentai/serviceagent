import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from '../landing/components/Navigation';
import { client } from '../../app/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { POST_BY_SLUG_QUERY, type Post, estimateReadTime } from "@/modules/blog/post";
import { Helmet } from 'react-helmet';

// Image component for PortableText
const ImageComponent = ({ value }: { value: any }) => {
  const imageUrl = imageUrlBuilder(client).image(value).width(800).height(400).url();
  
  return (
    <div className="my-8">
      <img 
        src={imageUrl} 
        alt={value.alt || ''} 
        className="w-full max-w-[80%] h-auto rounded-xl shadow-lg mx-auto"
        loading="lazy"
      />
      {value.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {value.caption}
        </p>
      )}
    </div>
  );
};

// PortableText components
const components = {
  types: {
    image: ImageComponent,
  },
};

export const BlogPost: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Post>(POST_BY_SLUG_QUERY, { slug });
        if (!alive) return;
        setPost(data ?? null);
        setErr(null);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? 'Failed to load post');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading…</div>
        </div>
      </>
    );
  }

  if (err || !post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Post Not Found</h1>
            <p className="text-muted-foreground">{err ?? "The blog post you're looking for doesn't exist."}</p>
            <Link to="/blog" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to posts
            </Link>
          </div>
        </div>
      </>
    );
  }

  const readTime = estimateReadTime(post.bodyText);
  const desc = post.description ?? '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: desc,
    image: post.image,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'ServiceAgent',
      logo: { '@type': 'ImageObject', url: 'https://fsagent.com/logo.svg' }
    },
    url: `https://fsagent.com/blog/${slug}`
  };

  return (
    <>
     <Helmet>
      <title>{post.title} | ServiceAgent Blog</title>
      <meta name="description" content={desc} />
      <meta name="author" content={post.author} />
      <link rel="canonical" href={`https://fsagent.com/blog/${slug}`} />
      <meta property="og:title" content={`${post.title} | ServiceAgent Blog`} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={post.image} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://fsagent.com/blog/${slug}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={post.image} />
      <meta name="article:published_time" content={post.publishedAt} />
      <meta name="article:author" content={post.author} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </Helmet>

      <Navigation />

      <div className="min-h-screen bg-background">

        {/* Hero Image */}
        <section className="relative">
          <div className="h-96 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
           {/* Back link */}
        <div className="sticky top-0 mt-4 backdrop-blur-sm  z-10">
          <div className="container mx-auto ml-32 py-4">
            <Link to="/blog" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to posts
            </Link>
          </div>
        </div>
        </section>

        {/* Article */}
        <article className="pb-16 pt-4">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <header className="space-y-6 mb-12">
                {post.categoryTitle && <Badge variant="secondary">{post.categoryTitle}</Badge>}

                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>by {post.author}</span>
                    </div>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readTime}</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-base max-w-none prose-headings:text-foreground">
                {Array.isArray(post.body) && <PortableText value={post.body} components={components} />}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts (placeholder, keep if you want) */}
        {/* ... your related posts block ... */}
      </div>
    </>
  );
};

export default BlogPost;
