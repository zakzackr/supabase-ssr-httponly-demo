"use client";

import { login } from "./actions/route";

export default function loginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 border rounded-lg shadow-sm w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                <form className="space-y-4">
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
                        formAction={login}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}
