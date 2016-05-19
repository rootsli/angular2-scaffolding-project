import {Component} from 'angular2/core';
//css
require('../../../node_modules/@sdp.nd/portal-job-manager/build/css/bootstrap.css');
require('../../../node_modules/@sdp.nd/portal-job-manager/build/css/job.css');

//js
require('../../../node_modules/@sdp.nd/portal-job-manager/build/polyfill');
require('../../../node_modules/@sdp.nd/portal-job-manager/build/libs/system-util');
// require('../../../node_modules/@sdp.nd/portal-job-manager/build/libs/nd/hmac-sha256');
// require('../../../node_modules/@sdp.nd/portal-job-manager/build/libs/nd/enc-base64-min');
require('../../../node_modules/@sdp.nd/portal-job-manager/build/libs/nd/nd-md5-master');
require('../../../node_modules/@sdp.nd/portal-job-manager/build/vendor');
@Component({
  selector: 'zcgl',
  template: require('../../../node_modules/@sdp.nd/portal-job-manager/build/index.html'),
})
export class Zcgl {
  constructor() {
  }

  ngOnInit(){
    setTimeout(()=>require('../../../node_modules/@sdp.nd/portal-job-manager/build/index'),5000);
  }
}
