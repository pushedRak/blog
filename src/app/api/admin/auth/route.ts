import { createApiError } from "@utils/apiError";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      (await cookies()).set("admin_authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return createApiError("UNAUTHORIZED", "비밀번호가 다릅니다.", 401);
    }
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

export async function GET() {
  const isAdmin =
    (await cookies()).get("admin_authenticated")?.value === "true";
  return NextResponse.json({ isAdmin });
}
