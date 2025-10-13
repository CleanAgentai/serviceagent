import type { SanityDocument } from "@sanity/client";

export const POSTS_QUERY = (page: number, limit: number) => {
  if (page === 0) {
    // For first page, prioritize featured posts (7 total: 1 featured + 6 others)
    return `*[
      _type == "post" && defined(slug.current)
    ]|order(featured desc, publishedAt desc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      description,
      "categoryTitle": category->title,
      author,
      "image": image.asset->url,
      featured,
      "bodyText": pt::text(body)
    }`;
  } else {
    // For other pages, skip featured posts and show regular posts (6 per page)
    // Skip the first 6 posts from page 0 (after featured)
    const skipAmount = 6 + (page - 1) * 6;
    return `*[
      _type == "post" && defined(slug.current) && !featured
    ]|order(publishedAt desc)[${skipAmount}...${skipAmount + limit}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      description,
      "categoryTitle": category->title,
      author,
      "image": image.asset->url,
      featured,
      "bodyText": pt::text(body)
    }`;
  }
};

export const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current) && !featured])`;

export const POST_BY_SLUG_QUERY = `*[
  _type == "post" && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  "categoryTitle": category->title,
  author,
  "image": image.asset->url,
  featured,
  "bodyText": pt::text(body),
  body  // keep full Portable Text if you render with <PortableText />
}`;


export function estimateReadTime(text?: string) {
  if (!text) return "5 min read";
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 180));
  return `${mins} min read`;
}

export type Post = SanityDocument & {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  description?: string;
  categoryTitle?: string;
  author?: string;
  image?: string;
  featured?: boolean;
  readTime?: string;
  bodyText?: string;
  body?: any[];
};
