import { Post, PostListItem, Tag } from "@customTypes/post";

export interface GetPostsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

// 포스트 목록 조회
export async function getPosts(
  params: GetPostsParams = {}
): Promise<PostListItem[]> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", params.page.toString());
  }
  if (params.limit) {
    searchParams.set("limit", params.limit.toString());
  }
  if (params.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  const queryString = searchParams.toString();

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${
    queryString ? `?${queryString}` : ""
  }`;
  const res = await fetch(url);

  const result = await res.json();

  if (!res.ok) {
    console.log(result.detail);
    throw new Error(result.message || "포스트 데이터를 불러오지 못했습니다.");
  }

  return result;
}

interface GetPostParams {
  category: string;
  slug: string;
}

// 포스트 상세 조회
export async function getPost({
  category,
  slug,
}: GetPostParams): Promise<Post> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${category}/${slug}`;

  const res = await fetch(url);

  const result = await res.json();

  if (!res.ok) {
    console.log(result.detail);
    throw new Error(
      result.message || "포스트 상세 데이터를 불러오지 못했습니다."
    );
  }

  return result;
}

export interface CreatePostParams {
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  tags: string[];
  metadata: {
    description?: string;
    thumbnailUrl?: string;
    [key: string]: unknown;
  };
}

// 포스트 임시 저장
export async function createPost(postData: CreatePostParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.detail);
    throw new Error(result.message || "임시 저장에 실패했습니다.");
  }

  return result;
}

export interface DraftPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  tags: Tag[];
  metadata: {
    description?: string;
    thumbnailUrl?: string;
  };
  created_at: string;
  updated_at: string;
}

// 임시 저장된 포스트 목록 조회
export async function getDraftPosts(): Promise<DraftPost[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/drafts`
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.detail);
    throw new Error(
      result.message || "임시 저장된 게시글을 불러오지 못했습니다."
    );
  }

  return result;
}

// 임시 저장된 포스트 수정
export async function updateDraftPost(
  postId: string,
  postData: CreatePostParams
): Promise<DraftPost> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/drafts/${postId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.detail);
    throw new Error(
      result.message || "임시 저장된 게시글 수정에 실패했습니다."
    );
  }

  return result;
}

// 임시 저장된 포스트 삭제
export async function deleteDraftPost(postId: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/drafts/${postId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const result = await response.json();
    console.log(result.detail);
    throw new Error(
      result.message || "임시 저장된 게시글 삭제에 실패했습니다."
    );
  }
}

// 포스트 발행
export async function publishPost(postId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/publish/${postId}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    const result = await response.json();
    console.log(result.detail);
    throw new Error(result.message || "발행에 실패했습니다.");
  }
}
