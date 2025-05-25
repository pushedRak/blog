import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  try {
    const body = await req.json();
    const { title, slug, content, categoryId, tags, metadata } = body;

    // 유효성 검사
    if (!title || !content || !categoryId) {
      return createApiError(
        "VALIDATION_ERROR",
        "제목, 내용, 카테고리는 필수입니다.",
        400
      );
    }

    // RPC 함수 호출로 트랜잭션 처리
    const { data, error } = await supabase.rpc("update_draft_post_with_tags", {
      p_post_id: id,
      p_post_title: title,
      p_post_slug: slug,
      p_post_content: content,
      p_post_category_id: categoryId,
      p_post_tags: tags || [],
      p_post_metadata: metadata || {},
    });

    if (error) {
      return createApiError(
        "DB_UPDATE_ERROR",
        "임시 저장 게시글 수정 중 오류 발생",
        500,
        error.message
      );
    }

    // 첫 번째 결과 반환 (단일 레코드)
    const updatedPost = data?.[0];
    if (!updatedPost) {
      return createApiError(
        "NOT_FOUND",
        "임시 저장 게시글을 찾을 수 없습니다.",
        404
      );
    }

    // 응답 데이터 포맷팅
    const formattedResponse = {
      ...updatedPost,
      categoryId: updatedPost.category_id,
      category_id: undefined,
      tags: updatedPost.tags || [],
    };

    return NextResponse.json(formattedResponse);
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
