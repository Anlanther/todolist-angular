export interface ITask {
    // need to allow it to be null for the web api to assign a number to it
    id: number | null;
    taskName: string;
    description: string;
    dueDate: string;
    priorityLevel: number;
    isComplete: boolean;
}

// Good for error handling when using resolver
export interface ITaskResolved {
    task: ITask | null;
    error?: any;
}