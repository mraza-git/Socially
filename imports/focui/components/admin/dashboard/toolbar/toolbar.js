import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import {name as UserList} from '../../usermgmt/userlist.js';
import {name as Auth} from '../../../../../ui/components/auth/auth';

import webTemplate from './toolbar.web.html';
import mobileTemplate from './toolbar.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

const name = 'dashboardToolbar';

// create a module
export default angular.module(name, [  
  Auth,
]).component(name, {
  template,
  controllerAs: name,
});
