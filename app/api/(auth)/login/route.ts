import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";
import { comparePassword } from "@/lib/auth";
import { isValidEmailDomain } from "@/lib/validateEmail";
import { signJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const data = await req.json();
		const { email, password } = await data;

		if (!isValidEmailDomain(email, "ndt.co.za")) {
			return NextResponse.json({
				message: "Invalid NDT email. Please try again",
			});
		}

		const user = await db.user.findFirst({
			where: {
				Email: email,
			},
		});

		const isPasswordValid = await comparePassword(password, user?.Password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid Password" });
		}

		const token = signJwt({ id: user?.id, role: user?.Role }, "JWT_KEY!", 10);

		cookies().set("jwtToken", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60,
		});

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
