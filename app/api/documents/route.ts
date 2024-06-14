import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export const revalidate = 0;

export async function GET() {
  try {
    const res = await db.document.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const { url, userId } = await res;
    console.log(url, userId)

    const urls = url.map((item: { url: string; }) => item.url);

    console.log(urls)

   await Promise.all(urls.map(async (url:string) => {
      const dd = await db.document.create({
        data: {
          url: url,
          userId: userId,
        }
      });

      console.log(dd)
    
    }));

    return NextResponse.json( "Success" , { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
