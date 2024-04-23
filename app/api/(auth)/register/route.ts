import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const data = await req.json();
		const { email, password } = await data;
		console.log(email, password);

		const hashedPassword = await hashPassword(password, 10);
		console.log(hashedPassword);

		const user = await db.user.update({
			where: {
				Email: email,
			},
			data: {
				Password: hashedPassword,
			},
		});

		return NextResponse.json({ message: user }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
