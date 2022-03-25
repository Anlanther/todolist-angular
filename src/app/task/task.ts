export interface ITask {
    taskId: number;
    taskName: string;
    description: string;
    dueDate: string;
    priorityLevel: number;
    isComplete: boolean;
}