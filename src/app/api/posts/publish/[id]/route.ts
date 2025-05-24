import { Tag } from "@customTypes/post";
import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  try {
    // 포스트 존재 여부 확인
    const { data: existingPost, error: checkError } = await supabase
      .from("posts")
      .select("id, published_at")
      .eq("id", id)
      .single();

    if (checkError || !existingPost) {
      return createApiError("NOT_FOUND", "포스트를 찾을 수 없습니다", 404);
    }

    // 이미 발행된 포스트인지 확인
    if (existingPost.published_at) {
      return createApiError("BAD_REQUEST", "이미 발행된 포스트입니다", 400);
    }

    // 포스트 발행
    const { data, error } = await supabase
      .from("posts")
      .update({ published_at: new Date().toISOString() })
      .eq("id", id)
      .select(
        `
        *,
        categories (
          id,
          name,
          type,
          sort_order
        ),
        post_tags (
          tags (
            id,
            name
          )
        )
      `
      )
      .single();

    if (error) {
      return createApiError(
        "DB_UPDATE_ERROR",
        "포스트 발행 중 오류 발생",
        500,
        error.message
      );
    }

    if (!data) {
      return createApiError(
        "NOT_FOUND",
        "발행된 포스트를 찾을 수 없습니다",
        404
      );
    }

    // 태그 데이터 정리 - 타입 수정
    const tags = data.post_tags?.map((pt: { tags: Tag }) => pt.tags) || [];

    const responseData = {
      ...data,
      tags,
      post_tags: undefined,
    };

    return NextResponse.json(responseData);
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
