import {CommonValidationService} from '../../services/common-validation.service';

export class ValidationService extends CommonValidationService {
  //constructor() {
  //  super();
  //}

  //static getValidatorErrorMessage(code:string) {
  //  var errorMsg:string = '';
  //  let config = {
  //    'pattern':'3-16个数字',
  //    'invalidCreditCard': 'Is invalid credit card number',
  //  };
  //  errorMsg = config[code];
  //
  //  if(!errorMsg){
  //    errorMsg = CommonValidationService.getCommonValidatorErrorMessage(code);
  //  }
  //
  //  return errorMsg;
  //}

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'error': 'Is invalid credit card number'};
    }
  }
}
