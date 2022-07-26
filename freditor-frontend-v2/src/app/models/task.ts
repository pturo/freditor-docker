export interface Task {
    id?: number;
    title: string;
    taskElements: string[];
    date: string;
    progress: number;
}