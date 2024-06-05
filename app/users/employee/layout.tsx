import { logOut, getSession } from "@/actions/auth/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import EmployeeNav from "@/app/users/employee/_components/EmployeeNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const name = session.Name;

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-end px-8 items-center py-8 pr-16 bg-[#a2a1a81a]">
        <div className="profile flex items-center gap-x-3">
          <Popover>
            <PopoverTrigger className="flex items-center gap-4 text-[#d69436]">
              <b>{name}</b>
              <FaChevronDown />
            </PopoverTrigger>
            <PopoverContent className="flex items-center gap-4 w-fit border-2 border-primary rounded-xl">
              <form action={logOut}>
                <button type="submit">Log Out</button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="content flex flex-1">
        <EmployeeNav />

        <div className="main__content flex-1 m-12">
          <Image
            src={"/ndt-technologies-web-logo.svg"}
            alt=""
            width={100}
            height={100}
            className="background__image"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
