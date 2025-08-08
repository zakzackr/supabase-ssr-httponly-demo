import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            // redirect user to specified redirect URL or root of app
            console.log("redirectしまーす");
            redirect(next);
        }
    }

    // redirect the user to an error page with some instructions
    redirect("/error");
}
