import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITaskState } from "./task.reducer";

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