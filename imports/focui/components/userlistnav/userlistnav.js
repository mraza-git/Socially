import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import  {name as Contact} from './contact/contact';
import {name as navUser} from './user/user';
import {name as navDefault} from './default/default';

import webTemplate from './userlistnav.web.html';
import mobileTemplate from './userlistnav.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

const name = 'userListNav';

// create a module
export default angular.module(name, [
  angularMeteor,
  Contact,
  navUser,
  navDefault,
]).component(name, {
  template,
  controllerAs: name
});
