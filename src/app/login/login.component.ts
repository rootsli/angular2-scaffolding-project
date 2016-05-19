import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {FormBuilder, Validators}    from 'angular2/common';
import {Router} from 'angular2/router';

import {LoginService, User} from './login.service';
import {ValidationService} from './validation.service';
import {CacheService} from '../../services/cache.service'

@Component({
  selector: 'login',
  styles: [require('./login.css')],
  template: require('./login.html'),
  providers: [ValidationService, LoginService]
})
export class Login {
  public user = new User('', '');
  public errorMsg = '';
  public env:Object[] = [];
  loginForm:any;

  constructor(private _formBuilder:FormBuilder, private router:Router, private http:Http, private loginService:LoginService, private cacheService:CacheService) {
    this.loginForm = this._formBuilder.group({
      // 'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16), ValidationService.emailValidator])], //Validators.pattern('[0-9]{3,16}')
      // 'password': ['', ValidationService.passwordValidator]
      'name': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginService.login(this.user).subscribe(
        data => {
          //登录失败
          if (!data.access_token) {
            alert('登录失败 ${data.message}');
            return;
          }

          this.cacheService.setAuthInfo(data);
          this.router.navigate(['Main']);
        }, error =>alert('登录失败 ${error.message}')
      );
    }
  }


}
