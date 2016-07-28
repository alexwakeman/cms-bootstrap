import {Response} from "@angular/http";
import {Model} from "../models/model.utils";

export abstract class Service {
    /**
     * Generic error handler for promise based http requests
     * @param error
     */
    handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        throw new Error(errMsg);
    }

    /**
     * Returns a re-usable callback for a Thenable<Response>
     * @param ModelT - a reference to a Model class to bind server data to. Each service is
     * specialized to one model - this model type is passed in here
     * @returns {(res:Response)=>Array<Model>}
     */
    dataToModelArray(ModelT: any /* a typescript class reference */): (value: Response) => {} {
        return (res: Response): Array<Model> => { //
            let body = res.json();
            return body.data.map((userData:any) => {
                return new ModelT(userData);
            });
        }
    }

    /**
     * See dataToModelArray
     * @param ModelT
     * @returns {(res:Response)=>Model}
     */
    dataToModel(ModelT: any /* a typescript class reference */): (value: Response) => {} {
        return (res: Response): Model => {
            let body = res.json();
            return new ModelT(body.data);
        }
    }
}