import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .in("type", ["tech", "life"]);

    if (error) {
      return createApiError(
        "DB_QUERY_ERROR",
        "카테고리 데이터 조회에 실패했습니다.",
        500,
        error.message
      );
    }

    if (!data) {
      return createApiError(
        "NOT_FOUND",
        "카테고리 데이터가 존재하지 않습니다.",
        404
      );
    }

    const techCategories = data
      .filter((item) => item.type === "tech")
      .sort((a, b) => a.sort_order - b.sort_order);

    const lifeCategories = data
      .filter((item) => item.type === "life")
      .sort((a, b) => a.sort_order - b.sort_order);

    const sortedData = [...techCategories, ...lifeCategories];

    return NextResponse.json(sortedData);
  } catch (err: unknown) {
    let message = "알 수 없는 오류입니다.";

    if (err instanceof Error) {
      message = err.message;
    }

    return createApiError(
      "INTERNAL_SERVER_ERROR",
      "서버 내부 오류가 발생했습니다.",
      500,
      message
    );
  }
}
