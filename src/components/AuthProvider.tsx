"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
});

export function AuthProvider({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: User | null;
}) {
    const [user, setUser] = useState<User | null>(initialUser ?? null);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        // supabase.auth.getUser() cannot access httponly cookie, so it failed to fetch user object
        // ref: GoTrueClients.ts, helpers.ts
        // const getUser = async () => {
        //     try {
        //         console.log('AuthProvider: Getting user...');
        //         const {
        //             data: { user },
        //             error,
        //         } = await supabase.auth.getUser();
        //         console.log('AuthProvider: getUser result:', { user: user?.email, error });
        //         setUser(user);
        //         setIsLoading(false);
        //     } catch (err) {
        //         console.error('AuthProvider: Error getting user:', err);
        //         setIsLoading(false);
        //     }
        // };
        // getUser();

        // monitor auth-state change
        // ref: https://supabase.com/docs/reference/javascript/auth-onauthstatechange
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // INITIAL_SESSION event returns session as null because client-side Supabase client cannot access HTTPOnly cookies.
            // We ignore this event and trust the initialUser from server-side rendering instead.

            // 修正版の考え方
            if (event === "INITIAL_SESSION") {
                // initialUserが最新の状態を反映するよう確実にする
                console.log("INITIAL_SESSION: using initialUser", {
                    initialUser: initialUser?.email,
                });
                // initialUserをそのまま使用（サーバー側で取得済み）
                setIsLoading(false);
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                setUser(session?.user ?? null);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
            }

            // setIsLoading(false);
        });

        // cleanup-function
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value: AuthContextType = {
        user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
