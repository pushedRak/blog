// types/post.ts
export interface Tag {
  id: string;
  name: string;
}

export interface PostMetadata {
  description?: string;
  thumbnailUrl?: string;
  seoTitle?: string;
  readTime?: number;
  [key: string]: unknown;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  metadata: PostMetadata;
  categories?: {
    id: string;
    name: string;
    type: string;
  };
  tags?: Tag[];
  view_count?: number;
}

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  metadata: PostMetadata;
  categories?: {
    id: string;
    name: string;
    type: string;
  };
  view_count?: number;
}
