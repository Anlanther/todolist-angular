import { InMemoryDbService } from "angular-in-memory-web-api";
import { ITask } from "./task";

export class TaskData implements InMemoryDbService {
    createDb(): { tasks: ITask[] } {
        const tasks: ITask[] = [
            {
                taskId: 1,
                taskName: 'Finish Report',
                description: 'Biology report for class FIFS.',
                dueDate: new Date(2022, 2, 10),
                priorityLevel: 5,
                isComplete: false
            },
            {
                taskId: 2,
                taskName: 'Create Website',
                description: 'Practicing Angular.',
                dueDate: new Date(2022, 2, 10),
                priorityLevel: 5,
                isComplete: false
            }
        ];
        return { tasks };
    }
}