import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http} from "angular2/http"
import {CacheService} from '../services/cache.service'
import {Login} from './login/login.component';
import {Main} from './main/main.component';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('../assets/css/bootstrap.min.css'),
    require('../assets/css/custom.css'),
    `
    .header-container {
      overflow: visible;
      right: 0;
      z-index: 500;
      min-width: 900px;
      height: 44px;
      line-height: 44px;
      color: #fff;
      background-color: #2a2d34;
    }
    .header-container .rightsidebar{
      height: 100%;text-align: right;padding-right: 150px;
    }
    .header-container .rightsidebar img{
      width: 42px;
      height: 42px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 7px;
    }
    .header-container .rightsidebar a{
      margin-left: 15px;
      text-decoration:none;
      cursor: pointer;
    }
    .main-container {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    min-width: 900px;
    font-size: 14px;
    }
    .footer-container{
      clear: both;
      height: 55px;
      line-height: 55px;
      margin-top: 250px;
    }
  `],
  template: `
         <router-outlet></router-outlet>
<!--    <footer>
      Copyright © 2015 NetDragon Websoft Inc. All Rights Reserved
    </footer>-->
  `
})
@RouteConfig([
  {path: '/', name: 'Login', component: Login, useAsDefault: true},
  {path: '/main/...', name: 'Main', component: Main}
])
export class App {
  constructor(private cacheService:CacheService, private router:Router) {
  }

  ngOnInit() {
    if (this.cacheService.isLogin()) {
      this.router.navigate(['Main']);
    } else {
      this.router.navigate(['Login']);
    }
  }

}
