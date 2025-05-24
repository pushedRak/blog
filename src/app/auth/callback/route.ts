import { createClient } from "@utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (data.user.email === adminEmail) {
        (await cookies()).set("admin_authenticated", "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        return NextResponse.redirect(`${origin}`);
      } else {
        // 권한이 없는 사용자
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}`);
      }
    }
  }

  // 오류 발생 시
  return NextResponse.redirect(`${origin}`);
}
