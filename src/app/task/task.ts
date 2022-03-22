export interface ITask {
    taskId: number;
    taskName: string;
    description: string;
    dueDate: Date;
    priorityLevel: number;
    isComplete: boolean;
}