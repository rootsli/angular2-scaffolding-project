import {Injectable} from 'angular2/core';
import {Http} from "angular2/http"
import {Observable} from 'rxjs/Observable';
import {ApiHostService} from './api-host.service';

@Injectable()
export class CacheService {
  expires:number; //access_token保存周期

  constructor(private http:Http) {
    this.expires = null;
  }

  private API = {
    UC_USER: ApiHostService.uc_server
  };

  public getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return decodeURIComponent(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }

  public setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString())
  }

  //清除cookie
  public clearCookie(c_name) {
    this.setCookie(c_name, "", -1);
  }

  //保存登陆信息
  public setAuthInfo(authInfo) {
    if (this.getCookie('auto_login')) {
      this.expires = 10;
    }

    this.setCookie('access_token', authInfo.access_token, this.expires);

    this.setCookie('refresh_token', authInfo.refresh_token, this.expires);

    this.setCookie('mac_key', authInfo.mac_key, this.expires);

    this.setCookie('expires_at_milliseconds', new Date(authInfo.expires_at).getTime().toString(), this.expires);

    this.setCookie('user_id', authInfo.user_id, this.expires);

    //计算服务器时间和本地时间的差值
    if (authInfo.server_time) {
      var server_time = new Date(authInfo.server_time);
      this.setCookie('differ_time', (server_time.getTime() - new Date().getTime()).toString(), this.expires);
    }
  };

  //获取登陆用户信息
  public getLoginUser() {
    var self = this;
    return Observable.create(observer=> {
      let userInfo = sessionStorage.getItem('user');

      if (userInfo) {
        observer.next(JSON.parse(userInfo));
        observer.complete();
      } else {
        let user_id = self.getCookie('user_id');
        self.http.get(self.API.UC_USER + `/v0.93/users/${user_id}?realm=nd`).subscribe(res => {
          let body = res.json();
          let data = body || body.data || {};
          sessionStorage.setItem('user', JSON.stringify(data));
          observer.next(data);
          observer.complete();
        });
      }
    });
  };

  //是否已登录
  public isLogin() {
    return (this.getCookie('access_token') && '' !== this.getCookie('access_token'));
  };

  //获取登陆token
  public getAccessToken() {
    return this.getCookie('access_token');
  };

  //退出后清除缓存里所有登陆信息
  public clearAuthInfo() {
    this.clearCookie('access_token');
    this.clearCookie('refresh_token');
    this.clearCookie('mac_key');
    this.clearCookie('expires_at_milliseconds');
    this.clearCookie('user_id');
    this.clearCookie('differ_time');
  };
}
