import * as TaskAction from './task.actions';

import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ITask } from "../task";

// This section may be changed after changing it to lazy loading
// Routing course needs to be gone through first
export interface ITaskState {
    tasks: ITask[];
    error: string;
}

const initialState: ITaskState = {
    tasks: [],
    error: ''
}

// Selector functions
const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');

export const getTasks = createSelector(
    getTaskFeatureState,
    (state) => state.tasks
);

// Reducer functions
export const taskReducer = createReducer<ITaskState>(
    initialState,
    on(TaskAction.loadIncompleteTasksSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks,
            error: ''
        }
    }),
    on(TaskAction.loadCompleteTasksSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks,
            error: ''
        }
    }),
    on(TaskAction.updateTaskSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.task.id),
            error: ''
        }
    }),
);