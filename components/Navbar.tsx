import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { logOut } from "@/actions";

export default function Navbar() {
	return (
		<nav>
			<Image
				src={"/ndt-technologies-web-logo.svg"}
				alt=""
				width={100}
				height={100}
			/>

			<div className="profile flex items-center gap-x-3">
				<Popover>
					<PopoverTrigger className="flex items-center gap-4 text-[#dda83a] font-semibold">
						<FaChevronDown />
					</PopoverTrigger>
					<PopoverContent className="flex items-center gap-4 w-fit">
						<form action={logOut}>
                            <button type="submit">Logout</button>
                        </form>
					</PopoverContent>
				</Popover>
			</div>
		</nav>
	);
}
