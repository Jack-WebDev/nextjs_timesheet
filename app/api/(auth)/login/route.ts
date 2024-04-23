import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";
import { comparePassword } from "@/lib/auth";
import { isValidEmailDomain } from "@/lib/validateEmail";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const data = await req.json();
		const { email, password } = await data;

		// if (!isValidEmailDomain(email, "ndt.co.za")) {
		// 	return NextResponse.json({
		// 		message: "Invalid NDT email. Please try again",
		// 	});
		// }

		const user = await db.user.findFirst({
			where: {
				Email: email,
			},
		});

		const isPasswordValid = await comparePassword(password, user?.Password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid Password" });
		}

		return NextResponse.json({ message: user }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
