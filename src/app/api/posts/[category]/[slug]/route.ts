import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const supabase = await createClient();
  const { category, slug } = await params;

  try {
    // 1. 포스트 조회 (조회수 제외)
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

    // 2. 해당 포스트의 조회수 정보 조회
    const { data: viewData, error: viewError } = await supabase
      .from("post_views")
      .select("view_count, last_viewed_at")
      .eq("post_id", post.id)
      .single();

    if (viewError && viewError.code !== "PGRST116") {
      console.error("조회수 조회 오류:", viewError);
    }

    // 3. 포스트와 조회수 정보 결합
    const postWithViewCount = {
      ...post,
      view_count: viewData?.view_count || 0,
      last_viewed_at: viewData?.last_viewed_at || null,
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
