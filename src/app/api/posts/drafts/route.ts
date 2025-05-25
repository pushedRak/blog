import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    const query = supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        content,
        category_id,
        metadata,
        created_at,
        updated_at,
        categories (
          id,
          name,
          type
        )
      `
      )
      .is("published_at", null)
      .order("updated_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: drafts, error } = await query;

    if (error) {
      return createApiError(
        "DB_QUERY_ERROR",
        "임시 저장 게시글 조회 중 오류 발생",
        500,
        error.message
      );
    }

    // 포스트 ID들 추출
    const postIds = drafts?.map((draft) => draft.id) || [];

    // 태그 정보 별도 조회
    const { data: postTags, error: tagError } = await supabase
      .from("post_tags")
      .select(
        `
        post_id,
        tags (
          id,
          name
        )
      `
      )
      .in("post_id", postIds);

    if (tagError) {
      return createApiError(
        "DB_QUERY_ERROR",
        "태그 조회 중 오류 발생",
        500,
        tagError.message
      );
    }

    // 포스트별로 태그 그룹핑
    const tagsByPostId =
      postTags?.reduce((acc, item) => {
        if (!acc[item.post_id]) {
          acc[item.post_id] = [];
        }
        if (item.tags) {
          acc[item.post_id].push(item.tags);
        }
        return acc;
      }, {} as Record<string, unknown[]>) || {};

    // categoryId로 변환하고 태그 추가
    const draftsWithFormattedData =
      drafts?.map((draft) => ({
        ...draft,
        categoryId: draft.category_id,
        category_id: undefined,
        tags: tagsByPostId[draft.id] || [],
      })) || [];

    return NextResponse.json(draftsWithFormattedData);
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
