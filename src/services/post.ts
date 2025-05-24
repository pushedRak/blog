import { Post, PostListItem } from "@customTypes/post";

export interface GetPostsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

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

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // 1시간 캐시
  });

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

export async function getPost({
  category,
  slug,
}: GetPostParams): Promise<Post> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${category}/${slug}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // 1시간 캐시
  });

  const result = await res.json();

  if (!res.ok) {
    console.log(result.detail);
    throw new Error(
      result.message || "포스트 상세 데이터를 불러오지 못했습니다."
    );
  }

  return result;
}
