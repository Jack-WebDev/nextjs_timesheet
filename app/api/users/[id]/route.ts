import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";


export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const user = await db.user.findMany({
			where: {
				id: params.id,
				
			},
		});

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const user = await db.user.delete({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
