import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import {name as ThumbImage} from '../utilComponents/thumbImage/thumbImage';
import { Services } from '../../api/categories';
import {name as AuthModals} from '../../../client/components/authmodals/authModals';


import webTemplate from './landing.html';
import mobileTemplate from './landing.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

class Landing {
  constructor($scope, $state, AuthModals, $reactive) {
    'ngInject';
    this.service = {serviceName:""};
    this.allservices = [{}];
    this.state = $state;
    this.searchText="";
    this.authModals = AuthModals;

    $reactive(this).attach($scope);
    this.subscribe('service');
    this.subscribe('categories');

    this.helpers({
      services() {
        return Services.find({});
      },

    });
}

  selectedItemChange(item){
    console.log(item);
  }

  openLogin(event){
        this.authModals.openLoginModal(event);
  }
  openSignup(event){
    this.authModals.openRegisterModal(event);
  }
  openChangePassword(event){
    this.authModals.openChangeModal(event);
  }
  openForgotPassword(event){
    this.authModals.openForgotModal(event);
  }


}


const name = 'landing';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  AuthModals,
  ThumbImage,
]).component(name, {
  template,
  controllerAs: name,
  controller: Landing,
})
.config(config);
import mainLayoutTemplate from '../../../client/fuse/core/layouts/content-only.html';
import verticalNavigationFullwidthToolbar2_toolbarTemplate from '../../../client/fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html';

function config($stateProvider,msNavigationServiceProvider) {
  'ngInject';


  $stateProvider
    .state('app.landing', {
      url: '/landing',
      views:{
        'content@app.landing':{
          template: '<landing ></landing>',
        },
        'main@'         : {
            template: mainLayoutTemplate,
            controller : 'MainController as vm'
        },
        // 'toolbar@app.landing'   : {
        //     template: verticalNavigationFullwidthToolbar2_toolbarTemplate,//layouts[layoutStyle].toolbar,
        //     controller : 'ToolbarController as vm'
        // },
      },

    });

    // msNavigationServiceProvider.saveItem('fuse', {
    //         title : 'Fixonclick',
    //         group : true,
    //         weight: 1
    //     });
    //
        msNavigationServiceProvider.saveItem('Landing', {
            title    : 'Landing',
            icon     : 'icon-google-pages',
            state    : 'app.landing',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
}
