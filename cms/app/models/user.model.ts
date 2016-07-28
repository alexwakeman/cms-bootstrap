import {Model, ModelUtil} from "./model.utils";
export class User implements Model  {
    public _id: string = '';
    public firstName: string = '';
    public lastName: string = '';
    public organisation: string = '';
    public email: string = '';
    public password: string = '';
    constructor(params?: any) {
        // TODO: validate data
        params ? ModelUtil.bind(params, this) : null;
    }
}