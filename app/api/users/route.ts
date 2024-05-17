import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export async function GET() {
	try {
		const res = await db.user.findMany();

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		const { name, surname, email, password, status, department, role } =
			await reqBody;

		await db.user.create({
			data: {
				Name: name,
				Surname: surname,
				Email: email,
				Password: password,
				Status: status,
				Role: role,
			},
		});

		return NextResponse.json("User Created", { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
