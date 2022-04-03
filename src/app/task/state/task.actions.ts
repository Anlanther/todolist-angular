import { createAction, props } from "@ngrx/store";
import { ITask } from "../task";

export const toggleTaskStatus = createAction(
    '[Task] Toggle Task Status'
);

export const loadTasks = createAction(
    '[Task] Load'
);

export const loadTasksSuccess = createAction(
    '[Task] Load Success',
    props<{ tasks: ITask[] }>()
);

export const loadTasksFailure = createAction(
    '[Task] Load Fail',
    props<{ error: string }>()
);
