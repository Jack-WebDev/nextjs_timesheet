import { TaskProps } from './taskProps';


  
export type TableRowsProps = {
  id?: string;
  totalHours: number;
  totalMinutes: number; // Add this field
  comment: string;
  tasks: TaskProps[];
  weekday: string;
  userId?: string;
  typeOfDay: string;
};
