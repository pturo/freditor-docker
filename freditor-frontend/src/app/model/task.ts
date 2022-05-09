export interface Task {
    TaskId?: number;
    TaskTitle: string;
    TaskElements: string[] | any[] | any;
    TaskDeadline: Date;
    TaskProgress?: number;
}
