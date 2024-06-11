"use client";

import { UploadDropzone } from "@/utils/uploadThing";
import { Label } from "../ui/label";
import { toast } from "react-toastify";


export default function Documents() {
  return (
    <div className="grid grid-cols-2 gap-4">
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />
      </div>

      <div>
        <Label htmlFor="name" className="mb-1">
          Letter of Recommendation
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />
      </div>

      <div>
        <Label htmlFor="name" className="mb-1">
          Bank Statement
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />
      </div>

      <div>
        <Label htmlFor="name" className="mb-1">
          Resume
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />
      </div>



    </div>
  )
}
