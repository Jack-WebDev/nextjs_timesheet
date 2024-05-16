import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalData from "./PersonalData";
import ProfessionalData from "./ProfessionalData";
import Documents from "./Documents";
import Accounts from "./Accounts";

export default function AddEmployee() {
  return (
    <Tabs defaultValue="personalData" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="personalData">Personal Information</TabsTrigger>
        <TabsTrigger value="professionalData">
          Professional Information
        </TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="accounts">Accounts Access</TabsTrigger>
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
