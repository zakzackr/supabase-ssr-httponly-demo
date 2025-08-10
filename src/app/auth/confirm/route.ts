import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Magic Link confirmation endpoint
 * Exchange the hash for the session
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next");

    if (token_hash && type) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (!error) {
            // HTML page needed to update Header after authentication
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
                        // direct navigation
                        console.log('Redirecting to:', '${next}');
                        window.location.href = '${next}';
                    </script>
                </body>
            </html>`;

            return new Response(html, {
                headers: { "Content-Type": "text/html; charset=UTF-8" },
            });
        }
    }

    // redirect the user to login page
    return NextResponse.redirect(new URL("/login", request.url));
}
