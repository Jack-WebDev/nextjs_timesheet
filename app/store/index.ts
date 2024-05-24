import { create } from "zustand";

type User = {
  Email: string;
  Name: string;
  Password: string;
  Role: string;
  Status: string;
  Surname: string;
  createdAt: string;
  departmentId: string;
  departmentName: string;
  id:string;
};

export const useUser = create<User>(() => ({
  Email: "",
  Name: "",
  Password: "",
  Role: "",
  Status: "",
  Surname: "",
  createdAt: "",
  departmentId: "",
  departmentName: "",
  id:"",
}));
