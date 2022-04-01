import { createAction, createReducer, on } from "@ngrx/store";
import { ITask } from "../task";

// This section may be changed after changing it to lazy loading
// Routing course needs to be gone through first
export interface ITaskState {
    displayTask: boolean;
    tasks: ITask[];
}

const initialState: ITaskState = {
    displayTask: true,
    tasks: []
}

export const taskReducer = createReducer<ITaskState>(
    initialState,
    on(createAction('[Task] Toggle Task Status'), (state): ITaskState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            displayTask: !state.displayTask
        };
    })
);