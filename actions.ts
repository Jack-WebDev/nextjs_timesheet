"use server";

import { SessionProp, defaultSession, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

	session.Name = userData.message.Name;
	session.success = true;

	await session.save();
	redirect("/users/admin");
};

export const logOut = async () => {
	const session = await getSession();

	session.destroy();

	redirect("/");
};
