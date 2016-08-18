import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import "../../../../../client/fuse/core/core.module.js";

import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import utilsPagination from 'angular-utils-pagination';

import {name as userListNav} from '../../userlistnav/userlistnav';

import './userlist.scss';
import template from './userslist.web.html';

class UserList {
  constructor($scope, $reactive, $state,$mdToast) {
    'ngInject';
    $reactive(this).attach($scope);
    this.$state = $state;
    this.$mdToast = $mdToast;

    this.subscribe('adminusers');
    this.helpers({
        selectedUser: function(){
          return Meteor.users.findOne({
            _id: this.getReactively('selectedUserId')
          },{
            fields:{
                "services.password":0
            }
          }
          );
        },
      });
  }
  $onInit (){
    if(Roles.userIsInRole(Meteor.userId(),['admin','manage-users'],"default-group")) {
      this.$mdToast.show(
        this.$mdToast.simple()
        .textContent('Welcome Admin! :)')
        .position('top right')
        .action('x')
        .hideDelay(3000)
      );
    } else {
      this.$mdToast.show(
        this.$mdToast.simple()
        .textContent('I think you are lost, redirecting :)')
        .position('top right')
        .action('x')
        .hideDelay(3000)
      );
      this.$state.go('app.sample');
    }
  }

  onChange(userId){
    this.selectedUserId = userId;
    console.log(this.selectedUser);
  }

}


const name = 'userList';

// create a module
export default angular.module(name, [
  angularMeteor,
  utilsPagination,
  'app.core',
  userListNav,
])
  .component(name, {
    template,
    controllerAs: name,
    controller: UserList,
  })
  .config(config);


function config($stateProvider, msNavigationServiceProvider) {
  'ngInject';

  $stateProvider
  .state('app.userlist', {
    url: '/focusers',
    resolve:{
      currentUser($q) {
        if (Meteor.user() === null) {
          console.log("Your are not logged in");
          return $q.reject('AUTH_REQUIRED');
        }
      }
    },
    // Only run in the Content section of the app.
    views:{
       'content@app':{
        template: '<user-list></user-list>',
      },
    }
  });



}
