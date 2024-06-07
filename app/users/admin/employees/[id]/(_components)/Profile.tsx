import { Button } from "@/components/ui/button";
import { TabsDemo } from "./Tabs";
import { FaEdit } from "react-icons/fa";
import { FaBriefcase, FaEnvelope, FaUser } from "react-icons/fa";
import db from "@/database";
import EditProfile from "./Edit/EditProfile";
// import ProfileDetails from "./ProfileDetails";

export default async function Profile(params: { id: string }) {
  const user = await db.user.findFirst({
    where: {
      id: params.id,
    },
  });
  return (
    <div className="bg-[#F5F5F5] p-8 rounded-xl w-[70%] mx-auto">
      <div className="flex justify-between items-center">
        <div className="grid">
          <div className="flex items-center gap-x-2">
            <FaUser className="mr-2 h-4 w-4" />
            {user?.Name} {user?.Surname}
          </div>

          <div className="flex items-center gap-x-2">
            <FaBriefcase className="mr-2 h-4 w-4" />
            {user?.Position}
          </div>

          <div className="flex items-center gap-x-2">
            <FaEnvelope className="mr-2 h-4 w-4" />
            {user?.NDTEmail}
          </div>
        </div>

        <div>
          <EditProfile id={params.id} />
        </div>
      </div>

      <hr className="bg-secondary h-[2px] w-full my-8" />

      <TabsDemo />
    </div>
  );
}
