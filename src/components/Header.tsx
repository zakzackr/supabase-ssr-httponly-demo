import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";

export function Header({ user }: { user: User | null }) {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="hover:text-gray-300">
                        Home
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm">
                                Logged in as: {user.email}
                            </span>
                            <form action={logout}>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                                    Logout
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
