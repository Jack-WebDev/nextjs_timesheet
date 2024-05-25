"use server";

import { SessionProp, defaultSession, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export const getSession = async () => {
  const session = await getIronSession<SessionProp>(cookies(), sessionOptions);

  if (!session.success) {
    session.Name = defaultSession.Name;
  }

  return session;
};

type User = {
  [x: string]: any;
  Department?: string;
  Email?: string;
  Name?: string;
  Password?: string;
  Role?: string;
  Status?: string;
  Surname?: string;
};

export const login = async (userData: User) => {
  const session = await getSession();

  const fullName = `${userData.Name} ${userData.Surname}`;

  session.Name = fullName;
  session.success = true;
  session.Email = userData.Email;

  if (userData.Role === "Admin") {
    await session.save();
    redirect("/users/admin");
  } else if (userData.Role === "Manager") {
    await session.save();
    redirect("/users/manager");
  } else if (userData.Role === "Executive") {
    await session.save();
    redirect("/users/exec");
  } else {
    session.isAdmin = false;
    await session.save();
    redirect("/users/employee");
  }
};

export const logOut = async () => {
  const session = await getSession();
  cookies().delete("jwtToken");

  session.destroy();

  redirect("/");
};
