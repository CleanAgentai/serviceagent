import type { SanityDocument } from "@sanity/client";

// GROQ: list view
export const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
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

// Optional: single-post query (handy for BlogPost pages)
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
};
