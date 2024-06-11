import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  NDTEmail: string;
  Name: string;
  Password: string;
  Role: string;
  Position: string;
  Status: string;
  Surname: string;
  createdAt: string;
  departmentId: string;
  departmentName: string;
  id: string;
};

type Employee = {
  Name: string;
  Surname: string;
  Email: string;
  IdNumber: string;
  MobileNumber: string;
  Address: string;
  City: string;
  ZipCode: string;
  Province: string;
  DateOfBirth: string;
  MaritalStatus: string;
  Gender: string;
  Nationality: string;
  EmployeeType: string;
  NDTEmail: string;
  Password: string;
  departmentId: string;
  departmentName: string;
  Role: string; 
  Position: string;
  StartDate: string;
  OfficeLocation: string;
};

export const useUser = create(
  persist<User>(
    () => ({
      NDTEmail: "",
      Name: "",
      Password: "",
      Role: "",
      Position: "",
      Status: "",
      Surname: "",
      createdAt: "",
      departmentId: "",
      departmentName: "",
      id: "",
    }),
    {
      name: "user",
      partialize: (state) => ({ id: state.id, NDTEmail: state.NDTEmail, Name: state.Name, Surname:state.Surname, Position: state.Position }) as User,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useEmployee = create(
  persist<Employee>(
    () => ({
      Name: "",
      Surname: "",
      Email: "",
      IdNumber: "",
      MobileNumber: "",
      Address: "",
      City: "",
      ZipCode: "",
      Province: "",
      DateOfBirth: "",
      MaritalStatus: "",
      Gender: "",
      Nationality: "",
      EmployeeType: "",
      NDTEmail: "",
      Password: "",
      departmentId: "",
      departmentName: "",
      Role: "",
      Position: "",
      StartDate: "",
      OfficeLocation: "",
    }),{
      name: "employee",
      partialize: (state) => ({
        Name: state.Name,
        Surname: state.Surname,
        Email: state.Email,
        IdNumber: state.IdNumber,
        MobileNumber: state.MobileNumber,
        Address: state.Address,
        City: state.City,
        ZipCode: state.ZipCode,
        Province: state.Province,
        DateOfBirth: state.DateOfBirth,
        MaritalStatus: state.MaritalStatus,
        Gender: state.Gender,
        Nationality: state.Nationality,
        EmployeeType: state.EmployeeType,
        NDTEmail: state.NDTEmail,
        Password: state.Password,
        departmentId: state.departmentId,
        departmentName: state.departmentName,
        Role: state.Role,
        Position: state.Position,
        StartDate: state.StartDate,
        OfficeLocation: state.OfficeLocation,
      

    }) as Employee, storage: createJSONStorage(() => sessionStorage)}), );  


