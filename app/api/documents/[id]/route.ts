import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = await db.document.findMany();
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = await db.document.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(document, { status: 200 });
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
    const { url } = await res;

    const document = await db.document.update({
      where: {
        id: params.id,
      },
      data: {
        url: url,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
