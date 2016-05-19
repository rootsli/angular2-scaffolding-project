import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http} from "angular2/http"
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {ApiHostService} from '../../services/api-host.service';
import {CacheService} from '../../services/cache.service'
import {Zcgl} from '../zcgl/zcgl.component';
import {Xxgl} from '../xxgl/xxgl.component';

@Component({
  selector: 'main',
  styles: [require('./main.css')],
  template: require('./main.html'),
  directives: [ACCORDION_DIRECTIVES]
})

@RouteConfig([
  {path: '/', name: 'Zcgl', component: Zcgl, useAsDefault: true},
  {path: '/:id', name: 'Xxgl', component: Xxgl}
])

export class Main {
  constructor(private cacheService:CacheService, private http:Http, private router:Router) {
  }

  private userInfo:{} = {};
  private id:string = 'waniya';

  private API = {
    UC_TOKENS: ApiHostService.uc_server + '/v0.93/tokens/' + this.cacheService.getAccessToken()
  };

  logout() {
    this.http.delete(this.API.UC_TOKENS).subscribe(res => {
      this.cacheService.clearAuthInfo();
      this.router.navigate(['Login']);
    });
  }

  ngOnInit() {
    //获取登录用户信息
    this.cacheService.getLoginUser().subscribe(data => {
      this.userInfo = {
        name: data.nick_name,
        uid: data.user_id,
        avatar: "http://cs.101.com/v0.1/static/cscommon/avatar/" + data.user_id + "/" + data.user_id + ".jpg?size=80"
      };
    });
  }
}
