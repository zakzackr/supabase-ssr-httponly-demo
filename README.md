# Memo

-   Authentication → Sign In / Providers → Turn Off Confirm Email

-   onAuthStateChange only works in the client/browser and is used with useEffect. https://supabase.com/docs/reference/javascript/auth-onauthstatechange

-   supabase.auth.getUser() cannot access httponly cookie, so it failed to fetch user object. Ref: https://github.com/supabase/auth-js/blob/master/src/GoTrueClient.ts L1599(getUser)
    https://github.com/supabase/auth-js/blob/master/src/lib/helpers.ts
    L128(getItemAsync)
    https://github.com/supabase/ssr/blob/main/src/cookies.ts
    L34(createStorageFromOptions. cannot access httponly cookie using document.cookie API)

# References

[Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app)
[Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
[Listen to auth events](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)

[j4w8n/sveltekit-supabase-ssr](https://github.com/j4w8n/sveltekit-supabase-ssr)

# Memo

-   サーバー側でのみ認証状態を管理
-   クライアント側では状態変更をサーバー API 経由で行う
