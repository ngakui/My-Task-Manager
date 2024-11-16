// Purpose: Model for Task object.
export interface Task {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    dueDate: Date;
    completed: boolean;
    //priority: TaskPriority;
    status: TaskStatus;
}

export enum TaskStatus {
    Todo = 'To do',
    InProgress = 'In progress',
    Done = 'Done'
}