import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/api/:path*"]);

export default clerkMiddleware(async (auth, req) => {
  // Si es una ruta pública, no protejas la ruta
  if (isPublicRoute(req)) {
    return;
  }

  // Si no es pública, protege la ruta
  await auth.protect();
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
