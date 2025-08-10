import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Magic Link confirmation endpoint
 * Exchange the hash for the session
 *
 * ref: https://supabase.com/docs/guides/auth/auth-email-passwordless?queryGroups=language&language=js
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next"); // add ?? "/" for fallback

    if (token_hash && type) {
        const supabase = await createClient();

        // Log in a user given a TokenHash received through email
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (!error) {
            const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Authentication Success</title>
                </head>
                <body>
                    <p style="text-align: center; font-family: sans-serif; margin-top: 50px;">
                        Authentication successful. Redirecting...
                    </p>
                    <script>
                        // Navigate to destination URL (triggers full page reload to update Header Server Components)
                        window.location.href = '${next || "/"}';
                    </script>
                </body>
            </html>`;

            return new NextResponse(html, {
                headers: { "Content-Type": "text/html; charset=UTF-8" },
            });
        }
    }

    // Authentication failed or missing parameters - redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
}
