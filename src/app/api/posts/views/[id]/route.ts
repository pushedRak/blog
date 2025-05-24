// api/posts/views/[id]/route.ts
import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  try {
    if (!id || id === "undefined") {
      return createApiError(
        "BAD_REQUEST",
        "유효하지 않은 포스트 ID입니다.",
        400
      );
    }

    // 기존 조회수 확인
    const { data: existingView, error: selectError } = await supabase
      .from("post_views")
      .select("view_count")
      .eq("post_id", id)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116: no rows found
      return createApiError(
        "DB_QUERY_ERROR",
        "조회수 조회 중 오류 발생",
        500,
        selectError.message
      );
    }

    if (existingView) {
      // 기존 레코드가 있으면 업데이트
      const { error: updateError } = await supabase
        .from("post_views")
        .update({
          view_count: existingView.view_count + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq("post_id", id);

      if (updateError) {
        return createApiError(
          "DB_UPDATE_ERROR",
          "조회수 업데이트 중 오류 발생",
          500,
          updateError.message
        );
      }
    } else {
      // 없으면 새 레코드 생성
      const { error: insertError } = await supabase.from("post_views").insert({
        post_id: id,
        view_count: 1,
        last_viewed_at: new Date().toISOString(),
      });

      if (insertError) {
        return createApiError(
          "DB_INSERT_ERROR",
          "조회수 생성 중 오류 발생",
          500,
          insertError.message
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
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
