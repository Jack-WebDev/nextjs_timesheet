import { TableRowsProps } from './tableRowsProps';


export type TimesheetProps = {
    id: string;
    month: string;
    name: string;
    role: string;
    projectManager: string;
    projectName: string;
    weeklyPeriod: string;
    tableRows: TableRowsProps[];
    Approval_Status: string;
    comments: string;
  };