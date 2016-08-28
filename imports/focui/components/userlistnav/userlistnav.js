import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
// import "../../../../../client/fuse/core/core.module.js";

import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

import  {name as Contact} from './contact/contact';
import {name as navUser} from './user/user';
import {name as navDefault} from './default/default';

import webTemplate from './userlistnav.web.html';
import mobileTemplate from './userlistnav.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

class UserListNav{
  constructor($scope,$reactive,$state,$mdToast){
    'ngInject';
    this.state = $state;
    $reactive(this).attach($scope);
    this.helpers({
      userId(){
        return Meteor.userId();
      }
    });

  }
  selectedUser(contactId){
    this.onChange({
      userId: contactId
    });
  }

}


const name = 'userListNav';
// create a module
export default angular.module(name, [
  angularMeteor,
  Contact,
  navUser,
  navDefault,
]).component(name, {
  template,
  controllerAs: name,
  controller: UserListNav,
  bindings: {
    onChange: '&',
  },
});
