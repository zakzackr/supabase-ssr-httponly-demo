# Memo

-   Authentication → Sign In / Providers → Turn Off Confirm Email

-   onAuthStateChange only works in the client/browser and is used with useEffect. https://supabase.com/docs/reference/javascript/auth-onauthstatechange

-   supabase.auth.getUser() cannot access httponly cookie, so it failed to fetch user object. Ref: https://github.com/supabase/auth-js/blob/master/src/GoTrueClient.ts L1599(getUser)
    https://github.com/supabase/auth-js/blob/master/src/lib/helpers.ts
    L128(getItemAsync)
    https://github.com/supabase/ssr/blob/main/src/cookies.ts
    L34(createStorageFromOptions. cannot access httponly cookie using document.cookie API)

# Why MagicLink

password-less authentication

https://supabase.com/docs/guides/auth/auth-email-passwordless?queryGroups=language&language=js

```
improve the user experience by not requiring users to create and remember a password
Increase security by reducing the risk of password-related security breaches
Reduce support burden of dealing with password resets and other password-related flows
```

# MagicLink Settings

go to Auth Template page in your dashboard: Authentication→Emails→Template tab→Magic Link
update the Magic Link template
example:

<h2>Magic Link</h2>
<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/">Log In</a></p>

Site URL and Redirect URLs - link

Ensure these are set.

Site:
http://localhost:3002
Redirects:
http://localhost:3002/auth/confirm

# Upside

-   improve security

# Downside

-   cannot call getUser from client-side supabase client
-   cannot use onAuthStateChange with client-side supabase client

# References

[Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app)
[Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
[Listen to auth events](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)

[j4w8n/sveltekit-supabase-ssr](https://github.com/j4w8n/sveltekit-supabase-ssr)

# Memo

-   サーバー側でのみ認証状態を管理
-   クライアント側では状態変更をサーバー API 経由で行う
