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
		console.log(user)

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const res = await req.json();
		const { Name, Surname, Email, IdNumber, MobileNumber, Address, City, ZipCode, Province, DateOfBirth, MaritalStatus, Gender, Nationality} = await res;

		const user = await db.user.update({
			where: {
				id: params.id,
			},
			data: {
				Name: Name,
				Surname: Surname,
				Email: Email,
				IdNumber: IdNumber,
				MobileNumber: MobileNumber,
				Address: Address,
				City: City,
				ZipCode: ZipCode,
				Province: Province,
				DateOfBirth: DateOfBirth,
				MaritalStatus: MaritalStatus,
				Gender: Gender,
				Nationality: Nationality,

			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
