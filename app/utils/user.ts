import db from "@/database/index";

export async function getUserDetailsByEmail(email: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        Email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
}
