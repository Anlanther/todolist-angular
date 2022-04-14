import * as TaskAction from './actions/task.actions';

import { createReducer, on } from "@ngrx/store";
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
    on(TaskAction.toggleIncomepletePriority, (state, action): ITaskState => {
        return {
            ...state,
            filter: Number(action.priorityFilter)
        }
    }),
    on(TaskAction.toggleIncompletePrioritySuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks.filter((task) => state.filter === 0 ? task : task.priorityLevel == state.filter)
        }
    }),
    on(TaskAction.toggleComepletePriority, (state, action): ITaskState => {
        return {
            ...state,
            filter: Number(action.priorityFilter)
        }
    }),
    on(TaskAction.toggleCompletePrioritySuccess, (state, action): ITaskState => {
        return {
            ...state,
            tasks: action.tasks.filter((task) => state.filter === 0 ? task : task.priorityLevel == state.filter)
        }
    }),
);