"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type AuthState = {
    success?: boolean;
    message?: string;
};

/**
 * Handles user authentication via Magic Link email
 * Server Action to call the Supabase signInWithOtp function
 */
export async function login(
    _prevState: AuthState | null,
    formData: FormData
): Promise<AuthState> {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const email = formData.get("email") as string;

    // Signup/Signin with MagicLink
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
        },
    });

    if (error) {
        if (error.code == "over_email_send_rate_limit") {
            return {
                success: false,
                message:
                    "You have reached the sending limit. Please wait a moment and try again.",
            };
        }
        return {
            success: false,
            message: "Authentication failed. Please check your email address.",
        };
    }

    return {
        success: true,
        message: "A confirmation email has been sent. Please check your inbox.",
    };
}

/**
 * Logs out the current user and redirects to home page
 * Server Action to call the Supabase signOut function
 */
export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    // Clear cached user data across the app
    revalidatePath("/", "layout");
    return redirect("/");
}
