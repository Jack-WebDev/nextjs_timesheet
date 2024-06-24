"use client"

import { logOut, getSession } from "@/actions/auth/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import EmployeeNav from "@/app/users/employee/_components/EmployeeNav";
import { useUser } from "@/app/store";
import {usePathname} from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const user = useUser()
  const fullName = `${user.Name} ${user.Surname}`
  const pathname = usePathname()

  // const session = await getSession();
  // const name = session.Name;

  return (
    <EmployeeNav>

    <div className="flex flex-col h-screen">
      <header className="flex justify-between ml-[20rem] px-8 items-center py-8 pr-16">
      <h3>{pathname}</h3>
        <div className="profile flex items-center gap-x-3">
          <Popover>
            <PopoverTrigger className="flex items-center gap-4 text-[#d69436]">
              <b>{fullName}</b>
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

        <div className="main__content ml-[20rem] flex-1 m-12">
          {/* <Image
            src={"/ndt-technologies-web-logo.svg"}
            alt=""
            width={100}
            height={100}
            className="background__image"
          /> */}
          {children}
        </div>
      </div>
    </div>
    </EmployeeNav>
  );
}
