// src/app/private/page.tsx

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthTest } from "@/components/AuthTest";
import type { User } from "@supabase/supabase-js";

export default async function PrivatePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // This route requires authentication
    if (!user) {
        // If not authenticated, redirect to the login page
        redirect("/login");
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Private Page</h1>
            <div className="p-6 border rounded-lg bg-blue-50">
                <p className="text-lg">
                    Welcome! This page is protected and can only be seen by
                    logged-in users.
                </p>
                <p className="mt-2">
                    This is an example of a user-specific page, like a dashboard
                    or account settings.
                </p>
            </div>

            {/* Component to display user information */}
            <div className="mt-8">
                <AuthTest user={user as User} />
            </div>
        </main>
    );
}
