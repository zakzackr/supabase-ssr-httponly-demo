"use client";

import { useActionState } from "react";
import { login } from "../auth/actions";

/**
 * Login page component for Magic Link authentication
 */
export default function loginPage() {
    // useActionState manages Server Action state and provides form action and pending status
    const [loginState, loginAction, isLoginPending] = useActionState(
        login,
        null
    );

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 border rounded-lg shadow-sm w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                {loginState?.success && (
                    <div
                        style={{
                            color: "black",
                            backgroundColor: "#ffebee",
                            padding: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        {loginState.message}
                    </div>
                )}
                {loginState && !loginState.success && (
                    <div
                        style={{
                            color: "red",
                            backgroundColor: "#ffebee",
                            padding: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        <strong>error:</strong> {loginState.message}
                    </div>
                )}
                <form className="space-y-4" action={loginAction}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoginPending}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
