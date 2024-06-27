"use client";

import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "./store";

// const roboto = Roboto({
// 	weight: "400",
// 	subsets: ["latin"],
// 	display: "swap",
// });

 const metadata: Metadata = {
	title: "New Dawn 360 | New Dawn Technologies",
	icons: {
		icon: "/ndt-technologies-web-logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isDarkMode } = useThemeStore();

	return (
		<html lang="en" >
			<body className={isDarkMode ? 'dark-mode' : 'light-mode'}>
			<ToastContainer autoClose={2000} />
				{children}
			</body>
		</html>
	);
}
