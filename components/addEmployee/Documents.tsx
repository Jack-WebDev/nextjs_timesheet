"use client";

import { UploadDropzone } from "@/utils/uploadThing";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "../ui/button";
import { useEmployee } from "@/app/store";
import { createEmployee } from "@/actions/admin/employee/personalData";
import { useRouter } from "next/navigation";


export default function Documents() {
  const router = useRouter();
  const [documents, setDocuments] = useState<string[]>([]);

  const handleSubmit = async () => {
    useEmployee.setState({Documents: documents });

    const employeeData = localStorage.getItem("employee");
    if (employeeData) {
      const employee = JSON.parse(employeeData);
      createEmployee(employee.state);
      toast.success("Documents have been uploaded successfully.");
      router.replace("/users/admin/employees");
    }
    
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="name" className="mb-1">
          Documents
        </Label>
        <UploadDropzone
                  appearance={{
                    label:"text-primary hover:text-secondary",
                    button:"bg-primary text-white rounded-xl",
                  }}
          className=" border border-primary rounded-xl cursor-pointer custom-class"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setDocuments((prevDocs) => [...prevDocs, res[0].url]);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />

      </div>



          {documents}

          <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
