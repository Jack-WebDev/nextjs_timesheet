import { SessionOptions } from "iron-session";

export type SessionProp = {
	Department?: string;
	Email?: string;
	Name?: string;
	Password?: string;
	Role?: string;
	Status?: string;
	Surname?: string;
	success: boolean;
	isAdmin: boolean;
};

export const defaultSession: SessionProp = {
	Name: "",
	success: false,
	isAdmin: true,
	Email: ""
};

export const sessionOptions: SessionOptions = {
	password: process.env.SESSION_KEY || "3m5JKjozQ1NeUjAucKYwjXxyxmSba50EzuBGC9XTc44=",
	cookieName: "ndt-user_session",
	cookieOptions: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	},
};
