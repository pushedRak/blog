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
        ),
        post_views (
          view_count
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

    // 조회수 정보 정리
    const postsWithViews =
      posts?.map((post) => ({
        ...post,
        view_count: post.post_views?.[0]?.view_count || 0,
        post_views: undefined,
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

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  try {
    const { data: postId, error } = await supabase.rpc("create_post_complete", {
      title: body.title,
      slug: body.slug,
      content: body.content,
      category_id: body.categoryId,
      metadata: body.metadata || {},
      tags: body.tags || [],
    });

    if (error) {
      return createApiError(
        "DB_TRANSACTION_ERROR",
        "포스트 생성 중 오류 발생",
        500,
        error.message
      );
    }

    // 생성된 포스트 조회
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (postError || !post) {
      return createApiError(
        "NOT_FOUND",
        "생성된 포스트를 찾을 수 없습니다",
        404
      );
    }

    return NextResponse.json(post);
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
