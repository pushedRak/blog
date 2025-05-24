import { createApiError } from "@utils/apiError";
import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  // 로그아웃 처리
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    (await cookies()).delete("admin_authenticated");

    return NextResponse.json({ success: true });
  } catch {
    return createApiError(
      "INTERNAL_SERVER_ERROR",
      "로그아웃 중 오류가 발생했습니다.",
      500
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAdmin =
      (await cookies()).get("admin_authenticated")?.value === "true" &&
      user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    return NextResponse.json({ isAdmin, user: user?.email });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
