import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import "../../../../../client/fuse/core/core.module.js";

import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import utilsPagination from 'angular-utils-pagination';

import template from './userslist.web.html';

class UserList {
  constructor($scope, $reactive, $state,$mdToast) {
    'ngInject';
    this.$state = $state;
    this.userId = Meteor.userId();
    this.$mdToast = $mdToast;

    $reactive(this).attach($scope);

    this.helpers({
        users: function() {
          return Meteor.users.find({}, {
            sort: $scope.getReactively('sort')
          });
        },
        numberOfUsers: function() {
          return Counts.get('numberOfUsers');
        }
      });

      this.subscribe('adminusers', function() {
        return [{
          sort: $scope.getReactively('sort'),
          limit: parseInt($scope.getReactively('perPage')),
          skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
        }, $scope.getReactively('search'),"default-group"];
      });


    this.page = 1;
    this.perPage = 3;
    this.sort = { name_sort:1};
    this.orderProperty = '1';
  }
  pageChanged = function(newPage) {
    console.log(newPage);
    this.page = newPage;
  };
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

}


const name = 'userList';

// create a module
export default angular.module(name, [
  angularMeteor,
  utilsPagination,
  'app.core'
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
