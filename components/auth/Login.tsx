"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { login } from "@/actions";
import { toast } from "react-toastify";

const formSchema = z.object({
	email: z.string().min(2, {
		message: "Not a valid NDT email",
	}),
	password: z.string(),
});

export function LoginForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await axios.post("api/login", values);
			const userData = await res.data;
			const fullName = `${userData.Name} ${userData.Surname}`;
			localStorage.setItem("user", fullName);

			await login(userData);
		} catch (error) {
			toast.error(
				"An error occured while logging in. Please reload the screen and try again."
			);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your email"
									{...field}
									className="rounded-xl hover:border-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your password"
									{...field}
									className="rounded-xl hover:border-primary"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="login_btn w-full hover:bg-primary">
					Let Me In
				</Button>
			</form>
		</Form>
	);
}
