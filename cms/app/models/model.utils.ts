import {FormGroup, FormControl} from '@angular/forms';

export class ModelUtil {
    public static bind(params, scope) : any {
        Object.keys(params).forEach((key: string) => {
            if (scope.hasOwnProperty(key)) {
                scope[key] = params[key];
            }
        });
    }
    public static bindToForm(form:FormGroup, model: Model) {
        Object.keys(form.controls).forEach((key) => {
            if (model.hasOwnProperty(key)) {
                let formControl: FormControl = <FormControl> form.controls[key];
                formControl.updateValue(model[key]);
            }
        });
    }
}

export interface Model {}