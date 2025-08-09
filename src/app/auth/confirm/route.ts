import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    if (token_hash && type) {
        const supabase = await createClient();

        // go to Auth Template page in your dashboard: Authentication→Emails→Template tab→Magic Link
        // update the Magic Link template
        // example:
        // <h2>Magic Link</h2>
        // <p>Follow this link to login:</p>
        // <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Log In</a></p>
        const { data, error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        // TODO: logs
        console.log("verifyOtp result:", {
            user: data?.user?.email,
            session: !!data?.session,
            error,
        });

        if (!error) {
            // Force full page reload to ensure SSR re-execution
            return NextResponse.redirect(new URL(next, request.url));
        } else {
            console.log("verifyOtp error details:", error);
        }
    }

    // redirect the user to the login page
    return NextResponse.redirect(new URL("/login", request.url));

    // if (code) {
    //     const supabase = await createClient();
    //     const { error } = await supabase.auth.exchangeCodeForSession(code);

    //     // エラーオブジェクト全体を展開して、より詳細な情報を表示
    //     console.log("error from exchangeCodeForSession:", error);

    //     if (!error) {
    //         revalidatePath("/", "layout");
    //         return NextResponse.redirect(new URL(next, request.url));
    //     }
    // }

    // return NextResponse.redirect(new URL("/login", request.url));
}
