import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";
import { hashPassword } from "@/lib/auth";
import { isValidEmailDomain } from "@/lib/validateEmail";
import { signJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { email, password } = await data;


    if (!isValidEmailDomain(email, "ndt.co.za")) {
      return NextResponse.json({
        message: "Invalid NDT email. Please try again",
      });
    }

    const hashedPassword = await hashPassword(password, 10);

    const user = await db.user.update({
      where: {
        NDTEmail: email,
      },
      data: {
        Password: hashedPassword,
      },
    })


    const token = signJwt({ id: user?.id, role: user?.Role }, "JWT_KEY!", 10);

    cookies().set("jwtToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
