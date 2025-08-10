import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create server-side Supabase client
 * to access Supabase from Server Components, Server Actions, and Route Handlers,
 * which run only on the server.
 *
 * ref:https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
 */
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        // Set authentication cookies with secure options(httpOnly, sameSite, secure, etc.)
                        // This handles cookie updates from Server Actions and Route Handlers
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, {
                                ...options,
                                path: "/",
                                httpOnly: true,
                                sameSite: "strict",
                                secure: process.env.NODE_ENV === "production",
                            });
                        });
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}
