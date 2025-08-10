import { createBrowserClient } from "@supabase/ssr";

/**
 * Create client-side Supabase client
 * to access Supabase from Client Components, which run in the browser.
 *
 * ref:https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
}
