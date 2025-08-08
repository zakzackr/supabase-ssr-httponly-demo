import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PrivatePage from "./private/page";

export default async function Home() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return <PrivatePage user={user} />;
}
