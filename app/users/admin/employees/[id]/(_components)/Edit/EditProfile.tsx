"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaFileSignature } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { FaFolderTree } from "react-icons/fa6";

import { toast } from "react-toastify";
import { TabsDemo } from "../Tabs";
import PersonalData from "./PersonalData";


export default function EditProfile(params: { id: string }) {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary">
          <FaEdit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personalData" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="personalData">Personal Information</TabsTrigger>
            <TabsTrigger value="professionalData">
              Professional Information
            </TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="personalData">
            <PersonalData />
          </TabsContent>
          <TabsContent value="professionalData">
            <h1>Professional Information</h1>
          </TabsContent>
          <TabsContent value="documents">
            <h1>Documents</h1>
          </TabsContent>
        </Tabs>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
