"use client";

import { User } from "@supabase/supabase-js";

interface AuthTestProps {
    user: User;
}

export async function AuthTest({ user }: AuthTestProps) {
    return (
        <div
            className="p-5 border-2 border-gray-300 m-5 bg-gray-50 
        rounded-lg w-xl"
        >
            <h2>Authentication Test</h2>
            <div>
                {user ? (
                    <div style={{ color: "green" }}>
                        <p>✅ Logged in (Authenticated)</p>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Email:</strong>
                            {user.email}
                        </p>
                    </div>
                ) : (
                    <div style={{ color: "red" }}>
                        ❌ Not logged in (Unauthenticated)
                    </div>
                )}
            </div>

            {user ? (
                <div className="mt-5">
                    <button
                        className="py-[10px] px-[20px] bg-red-700 text-white 
                        border-none mr-[10px]"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="mt-5">
                    <button
                        className="py-[10px] px-[20px] bg-green-500 text-white 
                        border-none mr-[10px]"
                    >
                        Signin
                    </button>
                </div>
            )}
        </div>
    );
}
