import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

export function AddDepartment() {
	const [Department_Name, setDepartment_Name] = useState("");


	const handleSave = async () => {
		await axios.post(`api/departments/`, {
			Department_Name,

		});
        window.location.reload()

	};

	return (
		<Dialog>
			<DialogTrigger asChild>
			<Button className="rounded-xl bg-[#DDA83A] text-white gap-x-4 hover:bg-[#DDA83A]"><FaPlusCircle/>Add New Department</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Department</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Department
						</Label>
						<Input
							id="name"
							value={Department_Name}
							className="col-span-3 rounded-xl focus:border-[#DDA83A]"
							onChange={(e) => setDepartment_Name(e.target.value)}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button type="submit" className="bg-[#DDA83A] text-white rounded-xl hover:bg-[#DDA83A]" onClick={handleSave}>
						Add Department
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
