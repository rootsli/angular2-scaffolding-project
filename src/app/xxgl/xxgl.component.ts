import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'xxgl',
  template: require('./xxgl.html'),
  directives: [
    AlertComponent,
    DATEPICKER_DIRECTIVES
  ]
})
export class Xxgl {
  date: Date = new Date();
  divClass = 'my-div';
  city = '福州';
  src = 'http://cs.101.com/v0.1/static/cscommon/avatar/310198/310198.jpg?size=80';
  messages = [{from: 'aa', subject: 'test', message: 'fdsafdasfdsafsdafsdafsfds'}];
  doClick = function () {
    if(this.city==='贵州'){
      this.divClass = 'my-div my-div-red';
    }else {
      this.divClass = 'my-div';
    }
  };

  id:string;

  constructor(params: RouteParams) {
    this.id = params.get('id');
  }
}
