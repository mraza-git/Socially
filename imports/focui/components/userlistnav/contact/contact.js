import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './contact.web.html';
import mobileTemplate from './contact.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './contact.scss';

class NavContacts{
  constructor($scope,$reactive,$mdToast){
    'ngInject';
    this.page = 1;
    this.perPage = 10;
    this.sort = { profile:{
        name:1
      }
     };
    this.orderProperty = '1';

    $reactive(this).attach($scope);
    this.helpers({
        contacts: function() {
          return Meteor.users.find({}, {
            sort: $scope.getReactively('sort')
          });
        },
        numberOfUsers: function() {
          return Counts.get('numberOfUsers');
        }
      });
      if(Roles.userIsInRole(Meteor.userId(),['admin','manage-users'],"default-group")) {
        this.isAdmin = true;
        this.subscribe('adminusers', function() {
          return [{
            sort: $scope.getReactively('sort'),
            limit: parseInt($scope.getReactively('perPage')),
            skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
          }, $scope.getReactively('search'),"default-group"];
        });
      }
  }

  pageChanged = function(newPage) {
    console.log(newPage);
    this.page = newPage;
  };

  changed(selectedUserId) {
    this.onChange({
      userId: selectedUserId
    });
  }

}

const name = 'navContacts';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: NavContacts,
  bindings: {
    onChange: '&',
  },
});
