import { User } from "@supabase/supabase-js";

interface PrivatePageProps {
    user: User;
}

/**
 * users can only access this privatePage if they're logged in.
 */

export default async function PrivatePage({ user }: PrivatePageProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="font-bold">Login successful!!</div>
            <div>Hello, {user.email}</div>
            <div className="mt-10">src/app/private/page.tsx is displayed.</div>
        </div>
    );
}
