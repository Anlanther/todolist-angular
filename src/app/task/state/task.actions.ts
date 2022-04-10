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

export const loadIncompleteTasks = createAction(
    '[Task] Load Incomplete'
);

export const loadIncompleteTasksSuccess = createAction(
    '[Task] Load Incomplete Success',
    props<{ tasks: ITask[] }>()
);

export const loadIncompleteTaskFailure = createAction(
    '[Task] Load Incomplete Fail',
    props<{ error: string }>()
);

export const loadCompleteTasks = createAction(
    '[Task] Load Complete'
);

export const loadCompleteTasksSuccess = createAction(
    '[Task] Load Complete Success',
    props<{ tasks: ITask[] }>()
);

export const loadCompleteTaskFailure = createAction(
    '[Task] Load Complete Fail',
    props<{ error: string }>()
);

export const updateTask = createAction(
    '[Task] Update Task Status',
    props<{ task: ITask }>()
);

export const updateTaskSuccess = createAction(
    '[Task] Update Task Success',
    props<{ task: ITask }>()
);

export const updateTaskFailure = createAction(
    '[Task] Update Task Fail',
    props<{ error: string }>()
);