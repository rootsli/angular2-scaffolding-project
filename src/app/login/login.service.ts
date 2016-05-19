import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http"
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

import {ApiHostService} from '../../services/api-host.service';
import {NdMd5Service} from '../../services/nd-md5.service';

export class User {
  constructor(public login_name:string,
              public password:string) {
  }
}

@Injectable()
export class LoginService {
  url:string;

  private API = {
    UC_TOKENS: ApiHostService.uc_server + '/v0.93/tokens'
  };

  constructor(private http:Http, private ndMd5Service:NdMd5Service) {
    this.url = "http://fac-resouce-manage.dev.web.nd/v0.11/resconfig/environment";
  }

  login(user) {
    var login = {
      login_name: user.login_name + '@nd',
      password: this.ndMd5Service.getMD5Value(user.password)
    };

    return this.http.post(this.API.UC_TOKENS, JSON.stringify(login)).map(this.extractData).catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || body.data || {};
  }

  private handleError(error:any) {
    let errMsg = error.message || '服务器错误';
    return Observable.throw(errMsg);
  }

}
