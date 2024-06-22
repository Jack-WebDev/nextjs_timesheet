export type AP = {
  id?: string;
  property: string;
  contactPerson: string;
  contactNo: string;
};

export type Student = {
  id?: string;
  fullName?: string;
  idNumber?: string;
  studentNumber?: string;
  contactNumber?: string;
  email?: string;
  institution?: string;
  accommodation?: string;
};

export type HelpDesk = {
  id?: string;
  date?: string;
  callDuration?: string;
  callAgent?: string;
  campus?: string;
  apId?: string;
  studentId?: string;
  resolve?: string;
  query?: string;
  problem?: string;
  status?: string;
  client?:string;
  ap?: AP;
  student?: Student;
};
