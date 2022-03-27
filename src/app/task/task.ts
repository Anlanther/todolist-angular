export interface ITask {
    id: number;
    taskName: string;
    description: string;
    dueDate: string;
    priorityLevel: number;
    isComplete: boolean;
}