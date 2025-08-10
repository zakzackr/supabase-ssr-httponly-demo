import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@/components/UserProfile";
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
                {/* Component to display user information */}
                <div className="mt-8">
                    <UserProfile user={user as User} />
                </div>
            </div>
        </main>
    );
}
