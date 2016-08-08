import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';


import { name as AdminDataService } from '../../../services/dataService';

import template from './serviceList.html';

class ServiceList {
  constructor($scope, $state, $stateParams, AdminDataService) {
    'ngInject';
    this.services = [{}];
    this.service = {};
    this.state = $state;
    if (!$stateParams.cid) {
      console.log('Error no category selected...');
      $state.go('/');
      return;
    }


    AdminDataService.getCategoryById($stateParams.cid).then((data) => {
      this.category = data;
      this.services = data.businessservice;
    });
  }
  getSrc(pictureId) {
    const value = 'http://192.168.99.153:6280/Temp/Downloads/HostImage_' + pictureId + '-400-0.jpg';
    return value;
  }
  navigate() {
    this.state.go('/questions', { sid: this.service.id });
  }

}


const name = 'serviceList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  AdminDataService,
]).component(name, {
  template,
  controllerAs: name,
  controller: ServiceList,
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('serviceList', {
      url: '/serviceList/:cid',
      template: '<service-list></service-list>',
    });
}
