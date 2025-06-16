import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

async function getUserRoleFromToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.role;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  console.log(token);

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token ? await getUserRoleFromToken(token) : null;

  const protectedRoutes = {
    admin: [
      "/admin-dashboard",
      "/instructor-list",
      "/student-list",
      "/top-rated-courses",
      "/category-list",
      "/course-list",
      "/courses",
      "/create-user",
      "/create-course",
      "/enrollment-history",
      "/enroll-student",
      "/blog-list",
      "/create-blog",
      "/profile",
      "/transactions",
      "/settings",
    ],
    instructor: [
      "/instructor-dashboard",
      "/top-rated-courses",
      "/blog-list",
      "/create-blog",
      "/course-list",
      "/create-course",
      "/create-user",
      "/courses",
      "/profile",
      "/settings",
    ],

    student: [
      "/student-dashboard",
      "/create-user",
      "/my-courses",
      "/payment-history",
      "/profile",
      "/settings",
    ],
  };

  if (!role && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoutes = protectedRoutes[role] || [];

  const isRestricted = Object.values(protectedRoutes)
    .flat()
    .some((route) => pathname.startsWith(route));

  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

  if (isRestricted && !isAllowed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/instructor-list",
    "/student-list",
    "/category-list",
    "/course-list",
    "/create-course",
    "/my-courses",
    "/payment-history",
    "/enrollment-history",
    "/enroll-student",
    "/blog-list",
    "/create-blog",
    "/transactions",
    "/instructor-dashboard",
    "/student-dashboard",
    "/profile",
    "/courses/:pathname*",
    "/create-user/:pathname*",
    "/settings",
  ],
};
