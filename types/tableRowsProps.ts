import { TaskProps } from './taskProps';


export type TableRowsProps = {
    id?: string;
    totalHours: number;
    comment: string;
    tasks: TaskProps[];
    weekday: string;
    userId?: string;
    typeOfDay:string;
  };
  