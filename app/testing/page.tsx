import Accounts from "@/components/addEmployee/Accounts";
import Documents from "@/components/addEmployee/Documents";
import PersonalData from "@/components/addEmployee/PersonalData";
import ProfessionalData from "@/components/addEmployee/ProfessionalData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {FaUser, FaBriefcase, FaLock} from "react-icons/fa"
import { FaFileSignature } from "react-icons/fa";


export default function AddEmployee() {
  return (
    <Tabs defaultValue="personalData" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="personalData"><FaUser/> Personal Information</TabsTrigger>
        <TabsTrigger value="professionalData"><FaBriefcase/> Professional Information</TabsTrigger>
        <TabsTrigger value="documents"><FaFileSignature/> Documents</TabsTrigger>
        <TabsTrigger value="accounts"><FaLock/> Accounts Access</TabsTrigger>
      </TabsList>

      
      <TabsContent value="personalData">
        <PersonalData />
      </TabsContent>
      <TabsContent value="professionalData">
        <ProfessionalData />
      </TabsContent>
      <TabsContent value="documents">
        <Documents />
      </TabsContent>

      <TabsContent value="accounts">
        <Accounts />
      </TabsContent>
    </Tabs>
  );
}
