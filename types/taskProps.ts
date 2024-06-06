// export type TaskProps = {
//     id?: string;
//     taskPerformed: string;
//     taskStatus: string;
//     tableRowId?: string;
//   };
  

export type TaskProps = {
  id?: string;
  taskPerformed: string;
  taskStatus: string;
  hours: number;       // Add hours field
  minutes: number;     // Add minutes field
  tableRowId?: string;
};
