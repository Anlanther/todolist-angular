import * as TaskAction from './task.actions';

import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ITask } from "../task";

// This section may be changed after changing it to lazy loading
// Routing course needs to be gone through first
export interface ITaskState {
    displayTask: boolean;
    tasks: ITask[];
    error: string;
}

const initialState: ITaskState = {
    displayTask: true,
    tasks: [],
    error: ''
}

// Selector functions
const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');

// export const getTasks = createSelector(
//     getTaskFeatureState,
//     (state) => state.tasks
// );

export const getDisplayTask = createSelector(
    getTaskFeatureState,
    (state) => state.displayTask
)

// Reducer functions
export const taskReducer = createReducer<ITaskState>(
    initialState,
    on(TaskAction.toggleTaskStatus, (state): ITaskState => {
        return {
            ...state,
            displayTask: !state.displayTask
        };
    })
);