import Observer from "@src/core/observer/Observer";
import { UserData } from "../interfaces/UserData";

export default class UserObserver extends Observer<UserData>
{  
    /**
     * Observer for listening to the User updating
     * The data can be modified here
     * [Usage]
     *      [class extends IWithObserve].observer.on('updating', data)
     * @param data 
     * @returns 
     */
    updating = (data: UserData): UserData => {
        return data
    }
    
    /**
     * An example of a custom function 
     * [Usage]
     *      [class extends IWithObserve].observer.onCustom(customName as string, data)
     * @param data 
     * @returns 
     */
    onPasswordChanged = (data: UserData): UserData => {
        return data
    }
}