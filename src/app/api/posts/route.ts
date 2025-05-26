import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const categoryId = searchParams.get("categoryId");
  const offset = (page - 1) * limit;

  try {
    // 1. 포스트 목록 조회 (조회수 제외)
    let query = supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
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
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data: posts, error } = await query;

    if (error) {
      return createApiError(
        "DB_QUERY_ERROR",
        "포스트 목록 조회 중 오류 발생",
        500,
        error.message
      );
    }

    // 2. 포스트 ID들 추출
    const postIds = posts?.map((post) => post.id) || [];

    // 3. 조회수 정보 별도 조회
    const { data: viewsData, error: viewsError } = await supabase
      .from("post_views")
      .select("post_id, view_count, last_viewed_at")
      .in("post_id", postIds);

    if (viewsError) {
      console.error("조회수 조회 오류:", viewsError);
    }

    // 4. 조회수 데이터를 포스트별로 매핑
    const viewsMap =
      viewsData?.reduce((acc, view) => {
        acc[view.post_id] = {
          view_count: view.view_count,
          last_viewed_at: view.last_viewed_at,
        };
        return acc;
      }, {} as Record<string, { view_count: number; last_viewed_at: string | null }>) ||
      {};

    // 5. 포스트와 조회수 데이터 결합
    const postsWithViews =
      posts?.map((post) => ({
        ...post,
        view_count: viewsMap[post.id]?.view_count || 0,
        last_viewed_at: viewsMap[post.id]?.last_viewed_at || null,
      })) || [];

    return NextResponse.json(postsWithViews);
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
