import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { category: string; slug: string } }
) {
  const supabase = await createClient();
  const { category, slug } = params;

  try {
    // 1. 포스트 조회
    const { data: post, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        content,
        created_at,
        updated_at,
        published_at,
        metadata,
        categories (
          id,
          name,
          type
        ),
        post_views (
          view_count,
          last_viewed_at
        )
      `
      )
      .eq("slug", slug)
      .eq("categories.name", category)
      .not("published_at", "is", null)
      .single();

    if (error) {
      return createApiError(
        "DB_QUERY_ERROR",
        "포스트 상세 조회 중 오류 발생",
        500,
        error.message
      );
    }

    if (!post) {
      return createApiError("NOT_FOUND", "포스트를 찾을 수 없습니다.", 404);
    }

    // 2. 조회수 정보 정리
    const postWithViewCount = {
      ...post,
      view_count: post.post_views?.[0]?.view_count || 0,
      last_viewed_at: post.post_views?.[0]?.last_viewed_at || null,
      post_views: undefined,
    };

    return NextResponse.json(postWithViewCount);
  } catch (err: unknown) {
    let message = "알 수 없는 오류입니다.";
    if (err instanceof Error) message = err.message;
    return createApiError(
      "INTERNAL_SERVER_ERROR",
      "서버 내부 오류",
      500,
      message
    );
  }
}
