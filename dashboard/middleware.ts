import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/invite'];

    // Check if the current path starts with any of the public paths
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    const token = request.cookies.get('admin_token')?.value;
    const projectMode = request.cookies.get('project_mode')?.value;

    // If path is public and user is authenticated, redirect to specific dashboard or select-project
    if (isPublicPath && token) {
        const payload = await verifyToken(token);
        if (payload) {
            if (!projectMode) {
                return NextResponse.redirect(new URL('/select-project', request.url));
            }
            return NextResponse.redirect(new URL(`/${projectMode}`, request.url));
        }
    }

    // If path is protected and user is NOT authenticated, redirect to login
    if (!isPublicPath && !token) {
        if (!path.startsWith('/_next') && !path.startsWith('/api') && !path.startsWith('/static') && path !== '/favicon.ico') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // If path is protected and token exists, verify it
    if (!isPublicPath && token) {
        const payload = await verifyToken(token);
        if (!payload && !path.startsWith('/_next') && !path.startsWith('/api') && !path.startsWith('/static') && path !== '/favicon.ico') {
            // Invalid token
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('admin_token');
            return response;
        }

        // Redirect to select-project if no project is selected and we're not already there
        // Also prevent looping if we are already on the right path
        if (payload && !projectMode && path !== '/select-project' && !path.startsWith('/_next') && !path.startsWith('/api') && !path.startsWith('/static') && path !== '/favicon.ico') {
            return NextResponse.redirect(new URL('/select-project', request.url));
        }

        // If project IS selected, but we are at root /, redirect to project dashboard
        if (payload && projectMode && path === '/') {
            return NextResponse.redirect(new URL(`/${projectMode}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes) -> We now might want to protect some API routes too, but middleware handles the redirect.
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
