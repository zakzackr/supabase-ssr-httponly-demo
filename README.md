# supabase-ssr-httponly-demo

A Next.js demo showcasing Supabase SSR authentication with
httpOnly cookies and Magic Link login.

Uses @supabase/ssr, and Next.js 15 (App Router), TypeScript.

## Demo

https://github.com/user-attachments/assets/44796483-a487-4fd3-ae85-b7db25a42061

## Key Features

-   Magic Link passwordless authentication
-   Server-side session management with secure cookies(httpOnly, sameSite, secure, etc.)
-   Protected routes with middleware
-   New API keys(Publishable key)

## Prerequisites

1. A Supabase account.
2. A Supabase project.

## Project Structure

```
supabase-ssr-httponly-demo/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── actions.ts          # Server Actions for login/logout
│   │   │   └── confirm/
│   │   │       └── route.ts        # Magic Link confirmation handler
│   │   ├── login/
│   │   │   └── page.tsx            # Login page with Magic Link form
│   │   ├── private/
│   │   │   └── page.tsx            # Protected page (auth required)
│   │   ├── public/
│   │   │   └── page.tsx            # Public page (no auth required)
│   │   ├── layout.tsx              # Root layout with Header
│   │   └── page.tsx                # Home page
│   ├── components/
│   │   ├── Header.tsx              # Navigation header (Server Component)
│   │   └── UserProfile.tsx         # User info display component
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts           # Client-side Supabase client
│   │       ├── server.ts           # Server-side Supabase client
│   │       └── middleware.ts       # Handles Supabase session updates and authentication in middleware
│   └── middleware.ts               # Next.js middleware for auth
├── .env.example                    # Environment variables template
├── README.md
└── ...
```

## Install

```
git clone https://github.com/zakzackr/supabase-ssr-httponly-demo.git
cd supabase-ssr-httponly-demo
npm install
```

## Setup

### 1. Environment Variables

Rename the `.env.example` file to `.env.local` in the root directory. Set your supabase project configurations:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_SUPABASE_URL=https://<your_supabase_project_id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your_supabase_project_publishable_key>
NODE_ENV=development
```

### 2. Supabase Configuration

#### Authentication Settings

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Sign In / Providers** → **Supabase Auth** tab ([link](https://supabase.com/dashboard/project/qpkwgpvizadhqynfolrh/auth/providers))
3. **Turn OFF** "Confirm email" option

#### Site URL and Redirect URLs

1. Navigate to **Authentication** → **URL Configuration** ([link](https://supabase.com/dashboard/project/qpkwgpvizadhqynfolrh/auth/url-configuration))
2. Set the following URLs:
    - **Site URL**: `http://localhost:3002`
    - **Redirect URLs**: `http://localhost:3002/auth/confirm`

#### Magic Link Email Template

1. Go to **Authentication** → **Email** → **Template** tab → **Magic Link** tab ([link](https://supabase.com/dashboard/project/qpkwgpvizadhqynfolrh/auth/templates))
2. Update the template with:

```html
<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p>
    <a
        href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/"
        >Log In</a
    >
</p>
```

### 3. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3002`

# Why MagicLink

Passwordless authentication will improve security as described in the [official docs](https://supabase.com/docs/guides/auth/auth-email-passwordless?queryGroups=language&language=js):

```
Passwordless login can:
-   Improve the user experience by not requiring users to create and remember a password
-   Increase security by reducing the risk of password-related security breaches
-   Reduce support burden of dealing with password resets and other password-related flows
```

# @supabase/ssr + HttpOnly Cookies Authentication: Pros and Cons

## ✅ Pros

This implementation enhances security!!

-   **XSS Protection** - httpOnly cookies cannot be accessed by JavaScript, preventing token theft via XSS attacks
-   **Server-side validation** - All authentication checks happen on the secure server environment
-   Plus additional security with sameSite=strict for CSRF
    mitigation and secure flags for HTTPS-only transmission

## ❌ Cons

-   **Cannot use `getUser()`** - Client-side Supabase client cannot access httpOnly cookies to retrieve user object
-   **Cannot use `getClaims()`** - JWT claims are not accessible from client-side due to httpOnly cookie restriction
-   **Cannot use `onAuthStateChange`** - Authentication events like "SIGNED_IN", "SIGNED_OUT" cannot be caught on client-side since it requires access to httpOnly cookies
-   **Server-side only authentication** - All authentication logic must be handled on the server
-   **No real-time auth state** - Client components cannot reactively respond to authentication changes

<!-- -   onAuthStateChange only works in the client/browser and is used with useEffect. https://supabase.com/docs/reference/javascript/auth-onauthstatechange

-   supabase.auth.getUser() cannot access httponly cookie, so it failed to fetch user object. Ref: https://github.com/supabase/auth-js/blob/master/src/GoTrueClient.ts L1599(getUser)
    https://github.com/supabase/auth-js/blob/master/src/lib/helpers.ts
    L128(getItemAsync)
    https://github.com/supabase/ssr/blob/main/src/cookies.ts
    L34(createStorageFromOptions. cannot access httponly cookie using document.cookie API) -->

# References

-   [Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app)
-   [Passwordless email logins](https://supabase.com/docs/guides/auth/auth-email-passwordless?queryGroups=language&language=js)
-   [Introducing JWT Signing Keys
    ](https://supabase.com/blog/jwt-signing-keys)
-   [Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
-   [Listen to auth events](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)

Also inspired by [j4w8n/sveltekit-supabase-ssr](https://github.com/j4w8n/sveltekit-supabase-ssr)

## Feedback & Contributions

Any feedback, comments, and questions are always welcome through
[Discussions](https://github.com/zakzackr/supabase-ssr-httponly-demo/discussions) or [Issues](https://github.com/zakzackr/supabase-ssr-httponly-demo/issues)!
