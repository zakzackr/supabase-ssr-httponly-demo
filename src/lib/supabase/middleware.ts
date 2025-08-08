import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * update supabase session
 *
 * ref: https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
 */

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    // ref: https://github.com/orgs/supabase/discussions/12303#discussioncomment-13556098
                    // TLDR: This makes sure the request object has the updated cookie values for server-side operations
                    // This is necessary because the middleware needs to update the request object
                    // with the new cookie values before creating the response.
                    // This ensures that any subsequent middleware or route handlers
                    // have access to the updated cookie values.
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });

                    // TLDR: This makes sure the client gets the cookies
                    // This sets the cookies on the response object that will be sent back to the client.
                    // The additional options (httpOnly, secure, etc.) are important security settings
                    // that should be applied to the cookies sent to the browser.
                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set(name, value, {
                            ...options,
                            path: "/",
                            httpOnly: true,
                            sameSite: "strict",
                            secure: process.env.NODE_ENV === "production",
                        });
                    });
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (
        !user &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/auth")
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}
