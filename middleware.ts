export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/messages/:path*",
    "/bookings/:path*",
  ],
};
