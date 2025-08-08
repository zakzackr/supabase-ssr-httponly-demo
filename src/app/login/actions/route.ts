"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const email = formData.get("email") as string;

    // MagicLinkでのsignup/signin
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            // TODO: Magic Link クリック後のリダイレクト先の設定
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
        },
    });

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
