import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "angular2/http";
import {Router} from 'angular2/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

let hmacSHA256 = require('crypto-js/hmac-sha256');
let encBase64 = require('crypto-js/enc-base64');

export class HttpInterceptor extends Http {
  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private _router:Router) {
    super(backend, defaultOptions);
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    return super.request(url, options).catch((res:Response) => this.handleResponseError(res));
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.get(url, this.getRequestOptionArgs({
      url: url,
      method: 'GET'
    }, options)).catch((res:Response) => this.handleResponseError(res));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs({
      url: url,
      method: 'POST'
    }, options)).catch((res:Response) => this.handleResponseError(res))
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs({
      url: url,
      method: 'PUT'
    }, options)).catch((res:Response) => this.handleResponseError(res));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs({
      url: url,
      method: 'DELETE'
    }, options)).catch((res:Response) => this.handleResponseError(res));
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.patch(url, body, options).catch((res:Response) => this.handleResponseError(res));
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.head(url, options).catch((res:Response) => this.handleResponseError(res));
  }

  private getRequestOptionArgs(req, options?:RequestOptionsArgs):RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', this.getAuthHeader(req.url, req.method));
    return options;
  }

  private handleResponseError(res:Response) {

    console.log(res);

    // if ((res.status === 401 || res.status === 403) && res.url.endsWith('resconfig/environment')) {
    if (res.status === 401 || res.status === 403) {
      this._router.navigate(['Login']);
      return Observable.empty();
    } else if (res.status === 500) {
      // do something
    } else {
      return Observable.throw(res);
    }
  }

  private randomCode() {
    var code = "";
    var codeLength = 8;// 验证码的长度
    var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd',
      'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];// 所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
      var charIndex = Math.floor(Math.random() * 36);
      code += chars[charIndex];
    }
    return code;
  };

  private getCookie(c_name) {
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

  private getAuthHeader(url, method) {
    method = method.toUpperCase();
    var access_token = this.getCookie('access_token');
    var mac_key = this.getCookie('mac_key');
    var differ_time = this.getCookie('differ_time');

    if (!access_token || !mac_key) {
      return '';
    }

    var strAuth = 'MAC id="' + access_token + '",nonce="';
    var nonce = (new Date().getTime() + ((differ_time && differ_time != 'NaN' ? parseFloat(differ_time) : 0))) + ':' + this.randomCode();

    strAuth += nonce + '",mac="';

    var b = url.indexOf("//") + 2;
    var e = url.indexOf('/', b);
    var host = url.substring(b, e);
    var path = url.substring(e);
    var request_content = nonce + '\n' + method + '\n' + path + '\n' + host + '\n';
    var hash = hmacSHA256(request_content, mac_key);
    var mac = hash.toString(encBase64);
    strAuth += mac + '"';
    return strAuth;
  };

}
