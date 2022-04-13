import * as TaskAction from './task.actions';

import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ITask } from "../task";

// This section may be changed after changing it to lazy loading
// Routing course needs to be gone through first
export interface ITaskState {
    tasks: ITask[];
    filteredTasks: ITask[];
    filter: number;
    error: string;
}

const initialState: ITaskState = {
    tasks: [],
    filteredTasks: [],
    filter: 0,
    error: ''
}

// Selector functions
const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');

export const getTasks = createSelector(
    getTaskFeatureState,
    (state) => state.tasks
);

export const getPriorityFilter = createSelector(
    getTaskFeatureState,
    (state) => state.filter
);

// Reducer functions
// TODO: Create functions for loading failures
export const taskReducer = createReducer<ITaskState>(
    initialState,
    on(TaskAction.loadIncompleteTasksSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks,
            filter: 0,
            error: ''
        }
    }),
    on(TaskAction.loadCompleteTasksSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks,
            filter: 0,
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
    on(TaskAction.togglePriorityFilter, (state, action): ITaskState => {
        return {
            ...state,
            filter: Number(action.priorityFilter)
        }
    }),
    on(TaskAction.togglePriorityFilterSuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks.filter((task) => task.priorityLevel == state.filter)
        }
    })
);