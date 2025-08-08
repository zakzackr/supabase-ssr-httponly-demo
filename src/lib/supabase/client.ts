import { createBrowserClient } from "@supabase/ssr";

/**
 * create client-side supabase clinet
 *
 * ref:https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
}
