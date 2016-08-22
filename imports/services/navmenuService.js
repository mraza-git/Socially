import angular from 'angular';
import angularMeteor from 'angular-meteor';

import '../../client/fuse/core/core.module.js';

const name = 'focNavMenuService';



class FocNavMenuService {
  constructor(msNavigationService) {
    'ngInject';
    this.msNavigationService = msNavigationService;
  }
  setAdminNavMenus(){
    // Admin Menus
    this.msNavigationService.saveItem('Admin.Users', {
      title    : 'Users',
      icon     : 'icon-users',
      state    : 'app.userlist',
      /*stateParams: {
      'param1': 'page'
      },*/
      weight   : 1
    });
    this.msNavigationService.saveItem('Admin.Categories', {
      title    : 'Categories',
      icon     : 'icon-setting',
      state    : 'app.categorylist',
      /*stateParams: {
      'param1': 'page'
      },*/
      weight   : 2
    });

  }
  setSupplierNavMenus(){
    // Delete Admin Menus if exists
    this.msNavigationService.deleteItem('Admin');

  }
  setCustomerNavMenus(){
    this.msNavigationService.deleteItem('Admin');
    //msNavigationService.deleteItem('Supplier');
  }


}


export default angular.module(name, [
  angularMeteor,
  'app.core',
])
  .service('focNavMenuService', FocNavMenuService);
