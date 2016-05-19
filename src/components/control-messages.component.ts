import {Component, Host} from 'angular2/core';
import {NgFormModel}    from 'angular2/common';
//import { ValidationService } from './../app/login/validation.service';

@Component({
  selector: 'control-messages',
  inputs: ['controlName: control'],
  styles:[
    `.alert-danger{
        position: absolute;
        left: 14px;
        right: 16px;
        padding: 5px !important;
        margin-bottom: 0 !important;
      }
  `
  ],
  template: `<div class="alert alert-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>`//,
  //providers: [ValidationService]
})
export class ControlMessages {
  controlName:string;

  constructor(@Host() private _formDir:NgFormModel) {
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    let c = this._formDir.form.find(this.controlName);

    for (let propertyName in c.errors) {
      // If control has a error
      if (c.errors.hasOwnProperty(propertyName) && c.touched) {
        // Return the appropriate error message from the Validation Service
        return c.errors[propertyName].toString(); //ValidationService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }
}
