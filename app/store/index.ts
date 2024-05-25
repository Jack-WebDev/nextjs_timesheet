import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  id: string;
};

export const useUser = create(
  persist<User>(
    () => ({
      Email: "",
      Name: "",
      Password: "",
      Role: "",
      Status: "",
      Surname: "",
      createdAt: "",
      departmentId: "",
      departmentName: "",
      id: "",
    }),
    {
      name: "user",
      partialize: (state) => ({ id: state.id, Email: state.Email, Name: state.Name, Surname:state.Surname }) as User,
    }
  )
);

const clearLocalStorageAfterTimeout = () => {
  const timeoutDuration = 5 * 60 * 60 * 1000; 
  setTimeout(() => {
    localStorage.removeItem("user");
  }, timeoutDuration);
};

clearLocalStorageAfterTimeout();
