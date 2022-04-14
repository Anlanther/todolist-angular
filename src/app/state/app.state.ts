import { ITaskState } from "../task/state/task.reducer";
import { IUserState } from "../user/state/user.state";

export interface State {
    tasks: ITaskState;
    user: IUserState;
}