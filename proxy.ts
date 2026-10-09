// Base proxy code from Supabase documentation
// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#nextjs-proxy
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims()

  // LudaVault Code
  // Get the expiration date from the claims
  const expirationDate = data?.claims?.exp 

    const pathname = request.nextUrl.pathname;
  const protectedRoutes = ["/games", "/profile"];
  const authRoutes = ["/login", "/signup"];

  const isProtectedPath = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPath = authRoutes.some((route) => pathname.startsWith(route));

  // If unauthenticated or authentication expired, and accessing a protected path redirect to /login
  if (isProtectedPath && (expirationDate === undefined || expirationDate * 1000 < Date.now())) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  // If already authenticated and authentication is not expired and accessing login/signup, redirect to /games
  if (isAuthPath && (expirationDate !== undefined && expirationDate * 1000 >= Date.now())) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/games";
    return NextResponse.redirect(redirectUrl);
  }


  return supabaseResponse
}

export const config = {
  matcher: [
    "/games/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};