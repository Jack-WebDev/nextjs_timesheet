import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Token = {
	id: string;
	role: string;
	iat: string;
	exp: string;
};

export function middleware(request: NextRequest) {
	const token = request.cookies.get("jwtToken");

	if (token?.value) {
		try {
			const decoded = jwtDecode<Token>(token.value);

			if (
				request.nextUrl.pathname.startsWith("/users/admin") &&
				decoded.role !== "Admin"
			) {
				return NextResponse.rewrite(new URL("/blocked", request.url));
			}
		} catch (error) {
			console.error("JWT decoding failed:", error);
		}
	} else {
		console.error("JWT token not found in cookies or is undefined");
	}

	if (!token) {
		if (request.nextUrl.pathname.startsWith("/users")) {
			return NextResponse.rewrite(new URL("/blocked", request.url));
		}
		if (
			request.nextUrl.pathname.endsWith("/departments") ||
			request.nextUrl.pathname.endsWith("/users") ||
			request.nextUrl.pathname.endsWith("/projects") ||
			request.nextUrl.pathname.endsWith("/timesheets")
		) {
			return NextResponse.rewrite(new URL("/blocked", request.url));
		}
	}
}
