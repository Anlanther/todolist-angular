import { InMemoryDbService } from "angular-in-memory-web-api";
import { ITask } from "./task";

export class TaskData implements InMemoryDbService {
    createDb(): { tasks: ITask[] } {
        const tasks: ITask[] = [
            {
                id: 1,
                taskName: 'Finish Report',
                description: 'Biology report for class FIFS.',
                dueDate: "2022-02-11",
                priorityLevel: 5,
                isComplete: false
            },
            {
                id: 2,
                taskName: 'Create Website',
                description: 'Practicing Angular.',
                dueDate: "2022-02-10",
                priorityLevel: 5,
                isComplete: false
            }
        ];
        return { tasks };
    }
}