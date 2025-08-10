"use client";

import { User } from "@supabase/supabase-js";

interface UserProfileProps {
    user: User;
}

/**
 * UserProfile component
 * Shows authenticated user's ID and email information
 */
export function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="p-5 border-2 border-gray-300 bg-gray-50 rounded-lg w-xl">
            <h2>User Profile</h2>
            <div style={{ color: "green" }}>
                <p>✅ Logged in (Authenticated)</p>
                <p>
                    <strong>ID:</strong> {user.id}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
            </div>
        </div>
    );
}
