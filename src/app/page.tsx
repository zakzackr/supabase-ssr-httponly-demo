import Link from "next/link";

export default function HomePage() {
    return (
        <main className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">
                Supabase SSR & httpOnly Cookie Demo
            </h1>
            <p className="text-lg mb-8">
                This demo showcases secure authentication in Next.js using
                Supabase.
            </p>

            <div className="space-y-4">
                <p>
                    Explore the different pages to see route protection in
                    action:
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        href="/public"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Go to Public Page
                    </Link>
                    <Link
                        href="/private"
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Go to Private Page
                    </Link>
                </div>
            </div>
        </main>
    );
}
