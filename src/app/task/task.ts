export interface ITask {
    taskId: number;
    description: string;
    dueDate: Date;
    priorityLevel: number;
    isComplete: boolean;
}